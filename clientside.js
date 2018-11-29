const theurl = "https://brgraphql.herokuapp.com/"

method: "POST"
Host: brgraphql.herokuapp.com
Accept-Encoding: gzip, deflate, br
Content-Type: application/json
Accept: application/json
Connection: keep-alive
DNT: 1
Origin: https://brgraphql.herokuapp.com
cache-control: no-cache
Postman-Token: bab2bedd-c845-42c9-b6b7-27915a2551ce

method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: 

        {"query":"query {\n  records(arg1:\"facility_name=Cuba Memorial Hospital Inc&$limit=5\") {\n    facility_name\n    total_costs\n    age_group\n    discharge_year\n  }\n}\n"}