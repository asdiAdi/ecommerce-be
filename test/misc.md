##### copy csv to local https://www.kaggle.com/datasets/asaniczka/amazon-uk-products-dataset-2023
\copy amazon FROM 'downloads/amazon.csv' WITH (FORMAT csv, HEADER true, QUOTE '"')

TODO: handle empty string to transform to null values?

TODO: Add swagger api documentation