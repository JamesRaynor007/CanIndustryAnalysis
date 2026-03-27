# Data Analysis and Reporting Automation Workflow

This README outlines the step-by-step process for automating data analysis and reporting for potential clients. Each step is summarized in a single line for clarity.

---

1. **Obtain data from web sources via web scraping or load from Google Sheets and local CSV/XLSX files.**  <br>
Web Page<br>
https://catalog.data.gov/dataset/cannabis-retail-sales-by-week-ending <br>
CSV file (to be used) <br>
https://data.ct.gov/api/views/ucaf-96h6/rows.csv?accessType=DOWNLOAD <br>

2. **Perform data cleaning by removing duplicates, handling missing values, and formatting data appropriately.** <br> 

3. **Load cleaned data into MySQL Workbench by creating tables and automating the process with Python libraries like `mysql-connector-python` or `SQLAlchemy`.**  <br>

4. **Connect Power BI to the cleaned data files or directly to the MySQL database, ensuring data refresh mechanisms are in place.**  <br>

5. **Design and create client-specific Power BI reports, incorporating KPIs and visualizations, then save and publish them.**  <br>
6. **Export visuals and reports as PDFs or images from Power BI and spreadsheets using Python libraries like `matplotlib` or `seaborn`.**  <br>
7. **Develop a web dashboard by creating an HTML page that embeds images and visualizations, styled with HTML/CSS.**  <br>
8. **Add interactivity to the dashboard with JavaScript to support features like filtering and dropdowns, linking the JS to the HTML.**  <br>
9. **Set up version control by initializing a Git repository to store data files, scripts, reports, and dashboard files, and host on GitHub or GitLab.**  <br>
10. **Document the entire workflow in a `README.md`, including setup instructions, update procedures, dependencies, and tools used.**  

---
