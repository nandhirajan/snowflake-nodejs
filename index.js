const snowflake = require('snowflake-sdk');
require('dotenv').config()

const init = async () => {
    console.log("Inside Init");
    const { SNFLK_ACCOUNT_NAME, SNFLK_USER_NAME, SNFLK_PASSWORD, SNFLK_REGION, SNFLK_DB_NAME, SNFLK_SCHEMA_NAME } = process.env;

    const connection = await snowflake.createConnection({
        account: SNFLK_ACCOUNT_NAME,
        username: SNFLK_USER_NAME,
        password: SNFLK_PASSWORD,
        region: SNFLK_REGION
    });

    connection.connect((err, conn) => {
        if (err) {
            console.error('Unable to connect: ' + err.message);
        }
        else {
            console.log('Successfully connected to Snowflake.');
            connection_ID = conn.getId();
        }
    })

    connection.execute({ sqlText: `USE ${SNFLK_DB_NAME}.${SNFLK_SCHEMA_NAME}` });
    connection.execute({
        sqlText: 'select count(1) from NEO_ENROLMENTS where SUB_BATCH_ID =5347',
        complete: function (err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Number of rows produced: ' + JSON.stringify(rows));
            }
        }
    });
}

init();