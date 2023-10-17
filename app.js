
const dateRange = $RANGE{Date_Range|this month};
const productList = document.getElementById('productList');
const totalsList = document.getElementById('totalsList');

let currentPage;
let filterActive = 1

let sSQL = `SELECT  customer AS Customer
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'Alex' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Alex
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'frankie' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Frankie
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'jorge' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Jorge
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'mack' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Mack
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'roger' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Roger
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'ryan' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Ryan
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'ryo' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Ryo
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'stan' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Stan
                    , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'zach' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Zach
                    , CONCAT("$",FORMAT(SUM(sales.totalPrice),2,"en_US")) AS Total
            FROM    (
                    SELECT
                        so.salesman,
                        customer.name AS customer,
                        so.totalPrice,
                        so.dateCompleted,
                        so.dateIssued,
                        sostatus.name
                    FROM so
                    INNER JOIN postso ON postso.soId = so.id
                    INNER JOIN customer ON so.customerId = customer.id
                    INNER JOIN sostatus ON so.statusId = sostatus.id
                    WHERE postSo.postDate between '${dateRange.fromDate}' AND '${dateRange.toDate}'
                    ) AS sales
            GROUP BY Customer;`;



let totalSQL = `SELECT  'TOTALS' AS Customer
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'Alex' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Alex
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'frankie' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Frankie
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'jorge' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Jorge
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'mack' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Mack
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'roger' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Roger
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'ryan' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Ryan
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'ryo' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Ryo
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'stan' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Stan
                        , CONCAT("$",FORMAT(SUM(CASE WHEN sales.salesman = 'zach' THEN sales.totalPrice ELSE 0 END),2,"en_US")) AS Zach
                        , CONCAT("$",FORMAT(SUM(sales.totalPrice),2,"en_US")) AS Total
                    FROM    (
                            SELECT
                                so.salesman,
                                customer.name AS customer,
                                so.totalPrice,
                                so.dateCompleted,
                                so.dateIssued,
                                sostatus.name
                            FROM so
                            INNER JOIN postso ON postso.soId = so.id
                            INNER JOIN customer ON so.customerId = customer.id
                            INNER JOIN sostatus ON so.statusId = sostatus.id
                            WHERE postSo.postDate between '${dateRange.fromDate}' AND '${dateRange.toDate}'
                    ) AS sales
                    `



let sales = JSON.parse(runQuery(sSQL));
let totalSales = JSON.parse(runQuery(totalSQL));

const setCurrentPage = () => {

    productList.innerHTML = '';
    sales.forEach((item, index) => {
        const tableRow = document.createElement('tr');
        for (const i in item) {
            const rowItem = document.createElement('td');
            rowItem.textContent = item[i];
            tableRow.appendChild(rowItem);
        }
        productList.appendChild(tableRow);
    });

    totalsList.innerHTML = '';
    totalSales.forEach((item, index) => {
        const tableRow = document.createElement('tr');
        tableRow.classList.add('total-row');
        for (const i in item) {
            const rowItem = document.createElement('td');
            rowItem.textContent = item[i];
            tableRow.appendChild(rowItem);
        }
        productList.appendChild(tableRow);
    });


};

window.addEventListener('load', () => {
    setCurrentPage();
});
