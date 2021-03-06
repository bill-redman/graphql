const theurl = "https://brgraphql.herokuapp.com/";

docinfo = function() {
    var arg2 = 
    `{
        getdocinfo(arg2:"${theQuery.value}") {
                npi
                locationName
                degrees
                officeName
                address
                city
                state
                zip
                phone
                certifications
                specialties
                conditionsTreated
                insuranceAccepted
                educationList {
                    type
                    institutionName
                    yearCompleted
                }
                customFields {
                    PersonalStatement
                    Titles
                }
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