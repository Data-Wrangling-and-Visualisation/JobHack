import scrapy

class LinkedJobsSpider(scrapy.Spider):
    name = "linkedin_jobs"

    # Locations list (name, geoId)
    locations = [
        ("United States", "103644278"),
        ("Canada", "101174742"),
        ("United Kingdom", "101165590"),
        ("Germany", "101282230"),
    ]

    def start_requests(self):
        first_job_on_page = 0
        location_index = 0
        location_name, geo_id = self.locations[location_index]

        api_url = f"https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=python&location={location_name.replace(' ', '%20')}&geoId={geo_id}&start={first_job_on_page}"
        
        yield scrapy.Request(url=api_url, callback=self.parse_job, meta={'first_job_on_page': first_job_on_page, 'location_index': location_index})

    def parse_job(self, response):
        first_job_on_page = response.meta['first_job_on_page']
        location_index = response.meta['location_index']

        jobs = response.css("li")
        num_jobs_returned = len(jobs)
        
        for job in jobs:
            job_item = {
                'job_title': job.css("h3::text").get(default='not-found').strip(),
                'job_detail_url': job.css(".base-card__full-link::attr(href)").get(default='not-found').strip(),
                'job_listed': job.css('time::text').get(default='not-found').strip(),
                'company_name': job.css('h4 a::text').get(default='not-found').strip(),
                'company_link': job.css('h4 a::attr(href)').get(default='not-found'),
                'company_location': job.css('.job-search-card__location::text').get(default='not-found').strip(),
            }
            yield job_item

        # If jobs are found, continue scraping
        if num_jobs_returned > 0:
            first_job_on_page += 25

            # Change location every 50 jobs
            if first_job_on_page % 50 == 0:
                location_index = (location_index + 1) % len(self.locations)

            location_name, geo_id = self.locations[location_index]
            next_url = f"https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=python&location={location_name.replace(' ', '%20')}&geoId={geo_id}&start={first_job_on_page}"
            
            yield scrapy.Request(url=next_url, callback=self.parse_job, meta={'first_job_on_page': first_job_on_page, 'location_index': location_index})
