## Tax Manager

Clone the repo

```
git clone https://github.com/shrikrushana9960/tax-manager.git
```

change the directory

```
cd tax-manager
```

Start the application in docker

```
docker-compose -p 3000:3000 up --force-recreate
```
```
admin credential 
email: admin@gmail.com
passowrd:admin
Core infrastructure:
`````
User flow
`````
admin - create accountant 
Acccount- create tax payer
Tax Payer- paying tax

1. You can do this in any language. We dont care - language is just a tool. Work here is done primarily on python and reactjs (which you can learn if you join). At no point do we argue over the superiority of python over other languages. Its just a tool we ended up using and serves us well.
2. You will deliver your work as a Docker project. At RedCarpet we value seamless packaging of software to make it easy to develop and use. We expect you to do the same. Learning Docker isnt very hard. It takes an hour at most. Some examples are - https://nodejs.org/en/docs/guides/nodejs-docker-webapp/ , https://blog.codeship.com/building-minimal-docker-containers-for-go-applications/ , https://www.fullstackpython.com/blog/develop-flask-web-apps-docker-containers-macos.html, https://medium.com/@jhh3/all-the-small-things-86a8f2b3f67. You dont need to create an image and upload to a registry, just make sure the Dockerfiles work well. We will ONLY run your code through Docker. You should also specify how to run your testcases through Docker.
3. Registration and Roles - Different users can have different roles. The three roles are "tax-payer", "tax-accountant" and "admin". We want to see how you are creating/salting/hashing the passwords. Another question to think about is - how will you set the role of a user ? All of these are questions you should think about.
4. Your api needs to be protected by authentication. For all the API you will build, design an auth system. We want to see how you do this. Will you use a token? a username/password ? Are you using JWT? remember that for API, you cant have cookies. How will you handle roles in an API? Will you only ask for authentication once or will every api call be authenticated. All of these are questions you should think about.
5. All data should be stored in a database. Ideally we would want this in Postgresql..but for purposes of interview, you can use any database (including Mongodb or sqlite !)

Features:

1. List, view and edit tax-payers - this can only be done by "tax-accountant" and "admin" roles
2. One tax-accountant can manage different tax-payers.
3. Full tax is dependent on which state the tax-payer belongs to. Total tax = state tax + central tax. if it is a union territory, then no state tax (we expect you do some googling on your own to understand GST system)
4. NOTE: we expect you to figure out what a "tax" object will look like. SGST, CGST, state tax, arrears, fines, etc. This is domain knowledge that we expect our engineers to figure out by themeselves. Will you use reducing interest rates, etc ? Especially tricky question is how will you handle dates - we are especially interested to see this code, since date handling is one of the trickiest things here (is it needed to handle timezone information in your database ?)
5. Create a tax due - This can be done only by "tax-accountant" role. The system will take certain inputs (PAN card of tax-payer, income from salary, income from share market, etc etc) and calculate the total tax due. It also sets status as NEW or DELAYED based on due date.
6. Edit tax due. This can only be done by "tax-accountant". But it cannot be done if tax is already paid. IMPORTANT: We want to see how you design this. Can you save previous history ? In an extreme situation, can you "rollback" the changes ? Hint: the best designs here use "double safety" - logic in the code as well as database constraints.
7. Mark tax as paid. This can only be done by tax-payer. P.S. you dont need to do any UPI integration. Just create a dummy !
8. Ability to list and view tax due based on the filter applied - By "filter" we mean - select by date of creation, date of update, state of tax (NEW, PAID, DELAYED), etc. This action can be done by all : "tax-payer", "tax-accountant" and "admin" roles. HOWEVER - "tax-payer" can only see his own taxes...while "tax-accountant" and "admin" can see everyone's taxes. The way you design your data model above will allow you to do this. Make sure there are no security loopholes here. (P.S. you have to show us by writing the testcases to illustrate this)

Testcases:
Writing testcases are a cultural value and a hard requirement at RedCarpet. We wish to see the same. We prefer good testcases for less features, rather than no testcases and more features.
We dont expect you send a database dump for testing. All frameworks allow you to "mock" data (or fixtures).
Important: You should also specify how to run your testcases through Docker. This is the first thing we will try.

---
