const theurl = "https://brgraphql.herokuapp.com/";

docinfo = function() {
    var arg2 = 
    `{
        docinfoq(arg2:"${theQuery.value}") {
            npi
            name
            officeName
            address {
                line1
                line2
                city
                region
                postalCode
            }
            localPhone
            insuranceAccepted
          }
    }`


data = JSON.stringify({query:arg2})

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