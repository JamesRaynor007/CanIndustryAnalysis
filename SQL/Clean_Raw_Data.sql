SELECT * FROM test.clean_raw_data;

ALTER TABLE clean_raw_data MODIFY COLUMN `Week Ending` Date;

ALTER TABLE clean_raw_data MODIFY COLUMN `Adult-Use Retail Sales` DECIMAL(10,2);

ALTER TABLE clean_raw_data MODIFY COLUMN `Medical Marijuana Retail Sales` DECIMAL(10,2);

ALTER TABLE clean_raw_data MODIFY COLUMN `Total Adult-Use and Medical Sales` DECIMAL(10,2);

ALTER TABLE clean_raw_data MODIFY COLUMN `Adult-Use Products Sold` INT;

ALTER TABLE clean_raw_data MODIFY COLUMN `Medical Products Sold` INT;

ALTER TABLE clean_raw_data MODIFY COLUMN `Total Products Sold` INT;

ALTER TABLE clean_raw_data MODIFY COLUMN `Adult-Use Average Product Price` DECIMAL(5,2);

ALTER TABLE clean_raw_data MODIFY COLUMN `Medical Average Product Price` DECIMAL(5,2);