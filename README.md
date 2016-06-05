
## Installation

Install miniconda for your platform here:

http://conda.pydata.org/miniconda.html

````
>conda env create -f requirements.yml
````

This will install a boatload of libraries we need. Then, to use it, 

````
>source activate textvis  [if you're on Windows, it's activate textvis]
````

Your cursor should change to show the environment is active:

````
(textvis)>
````

You will want to start a web server in the root of this directory, using

````
>python -m SimpleHTTPServer 8001
````

Leave that window running.  Navigate your web-browser to localhost:8001. Click on web.

To run the python files that generate our web data, we will do this:

````
>cd python
>jupyter notebook
````

If your notebook opens in a browser window, you are all set for the tutorial.  Leave that window running as is, too!

When you want to shut down the python venv, you use:

````
>source deactivate [just deactivate, on windows]
````

And you can ^c in the jupyter window and in the server window, to shut them down.

## Data Files

If you have data files to use, it's best if they are plain text, ideally ascii. You can put them into a directory inside "data".  There are tools to convert PDFs, but it's not part of this class.

## For the Actual Class

I think we will have too many people downloading too many things if we do it at the start.  Let's all just make a small env for the basics before lunch.

````
>conda create --name tvis python=2 nltk jupyter
....say y to "proceed" and after that runs:
>source activate tvis
> pip install textkit
> cd python
> jupyter notebook
````

When we add to it for the afternoon, or if the internet seems fast, you will want to do this, inside the env:

````
>conda install matplotlib numpy scipy
and eventually
>conda install scikit-learn gensim pandas
````





