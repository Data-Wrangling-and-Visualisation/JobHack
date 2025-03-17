# JobHack

JobHack is a project designed to help you understand the job market better by providing tools to scrape up-to-date data from popular websites such as Indeed, LinkedIn, Headhunter, and more.

## Features

- **LinkedIn Scraper**: We have developed a scraper that extracts job listings from LinkedIn. Currently, only a small portion of the data is being scraped, as we are awaiting approval to be white-listed by LinkedIn.
  
- **Headhunter Data Extraction**: We have successfully extracted 2,000 job listings from Headhunter and conducted initial data analysis.

- **Data Augmentation**: We are running Ollama with LLaMA 3.2 (1B) to extend our dataset by fetching job description links from LinkedIn using BeautifulSoup. This process will allow us to extract additional fields such as salary range, technical requirements, educational requirements, and more, enabling further analysis.

## Tools Used
- **Ollama** with **LLaMA 3.2 (1B)**
- **BeautifulSoup** for web scraping
- **LinkedIn**, **Headhunter**, **Indeed**, and other job websites
