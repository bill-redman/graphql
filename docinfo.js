const theurl = "https://brgraphql.herokuapp.com/";

docinfo = function() {
    var arg1 = 
    `{
        docinfoq(arg1:"${theQuery.value}") {
            id
            uid
            accountId
            locationName
            address
            address2
            city
            state
            zip
            countryCode
            language
            phone
          }
    }`


data = JSON.stringify({query:arg1})

fetch(theurl,
    {
      method:'POST',
      body:data,
      headers:{
        "Content-Type": "application/json",
        //"Accept": "application/json",
        //"cache-control": "no-cache"
      }
    }
)
.then(response => response.json())
.then(json => {
    var div=document.getElementById('thedata')
    div.innerHTML = ''
    var pre=document.createElement('pre')
    div.appendChild(pre)
    pre.innerHTML = JSON.stringify(json,null,3)
})

}

//docinfo()