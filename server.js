const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { check, validationResult } = require("express-validator");
const { getConnection } = require("./helper");
const OPTIONS = {
    "definition": {
      "openapi": "3.0.0",
      "info": {
        "title": "Swagger Express Excercise API Reference",
        "version": "1.0.0",
        "description": "A Simple Express Swagger API",
        "termsOfService": "http://example.com/terms/",
        "contact": {
          "name": "Rithesh Reddy",
          "url": "https://github.com/RitheshReddy99/ITIS-6177-Assignment8",
          "email": "rmanchir@uncc.edu"
        }
      },
  
      "servers": [
        {
          "url": "http://147.182.204.228:3000/",
          "description": "Swagger Express API Documentation"
        }
      ]
    },
    "apis": ["./*.js"]
  }

const PORT = process.env.PORT || 3000;
const app = express();
const specs = swaggerJsDoc(OPTIONS);

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         ITEM_ID:
 *           type: string
 *         ITEM_NAME:
 *           type: string
 *         ITEM_UNIT:
 *           type: string
 *         COMPANY_ID:
 *           type: string
 */


/**
 * @swagger
 * /food:
 *   post:
 *     summary: Inserting Food Information
 *     tags: [food]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ITEM_ID:
 *                      type: string
 *                      example: 9
 *                  ITEM_NAME:
 *                      type: string
 *                      example: Biryani
 *                  ITEM_UNIT:
 *                      type: string
 *                      example: Pcs
 *                  COMPANY_ID:
 *                      type: string
 *                      example: 99\r
 *
 *     responses:
 *       200:
 *         description: Succesfully inserted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not insert
 */

app.post("/food", (req, res) => {
    let body = res.body;
    getConnection()
      .then((conn) => {
        conn
          .query("INSERT INTO foods (ITEM_ID, ITEM_NAME, ITEM_UNIT, COMPANY_ID) VALUES (?,?,?,?)",
          [body.ITEM_ID, 
           body.ITEM_NAME,
           body.ITEM_UNIT,
           body.COMPANY_ID
        ])
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Returns list of all the food items
 *     tags: [food]
 *     responses:
 *       200:
 *         description: The list of the food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get food items
 */

app.get("/food", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from foods")
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /food:
 *   put:
 *     summary: Updating Food Information
 *     tags: [food]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ITEM_ID:
 *                      type: string
 *                      example: 9
 *                  ITEM_NAME:
 *                      type: string
 *                      example: Icecream
 *
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */

app.put("/food", (req, res) => {
    let body = res.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE foods SET ITEM_NAME = ? WHERE ITEM_ID = ?"
          ,[body.ITEM_NAME,
            body.ITEM_ID
          ])
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /foods:
 *   patch:
 *     summary: Updating Food Information
 *     tags: [food]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ITEM_ID:
 *                      type: string
 *                      example: 9
 *                  ITEM_UNIT:
 *                      type: string
 *                      example: Ltr
 *
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */

app.patch("/foods", (req, res) => {
    let body = res.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE foods SET ITEM_UNIT = ? WHERE ITEM_ID = ?"
          ,[
              body.ITEM_UNIT,
              body.ITEM_ID,
          ])
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });


/**
 * @swagger
 * /foods/{id}:
 *   delete:
 *     summary: Deleting a food item with given item_id
 *     tags: [food]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 9
 *         required: true
 *         description: id that needs to be deleted
 *     responses:
 *       200:
 *         description: Succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Food item not deleted
 */

app.delete("/foods:id", (req, res) => {
    let id = req.params.id;
    getConnection()
      .then((conn) => {
        conn
          .query("DELETE FROM foods WHERE ITEM_ID = ?"
          ,id)
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.get("/customers", (req, res) => {
  getConnection()
    .then((conn) => {
      conn
        .query("SELECT * from customer")
        .then((rows) => {
          res.json(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/customer/:id", (req, res) => {
  var id = req.params.id;
  getConnection()
    .then((conn) => {
      conn
        .query(`SELECT * from customer where CUST_CODE = ?`, id)
        .then((rows) => {
          console.log(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/customer", (req, res) => {
  var sort = req.query.amnt_sort;
  getConnection()
    .then((conn) => {
      conn
        .query(`SELECT * from customer order by OUTSTANDING_AMT ${sort}`)
        .then((rows) => {
          console.log(rows);
        })
        .catch((err) => {
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));