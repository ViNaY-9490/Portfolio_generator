import { useState } from "react"
import PortfolioForm from "../Components/PortfolioForm"
import PortfolioPreview from "../Components/PortfolioPreview"
import Swal from "sweetalert2"
import axios from "axios"
import { useLocation } from "react-router-dom";

function Builder(){
    const location = useLocation();
const username = location.state?.username;

const [data,setData] = useState({
name:"",
title:"",
about:"",
location:"",
email:"",
phone:"",
github:"",
linkedin:"",
website:"",
image:"",
skills:[],
projects:[{title:"",description:"",link:""}]
})

const [generatedData,setGeneratedData] = useState(null)

function generatePortfolio(){
setGeneratedData(data)
}

function generateHTML(d){

const skills = d.skills || []
const projects = d.projects || []

return `

<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
<title>${d.name}</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<style>

body{
margin:0;
font-family:Arial;
background:linear-gradient(135deg,#667eea,#764ba2);
color:white;
padding:20px;
}

.container{
max-width:900px;
margin:auto;
}

.glass{
background:rgba(255,255,255,0.1);
backdrop-filter:blur(10px);
border-radius:16px;
padding:20px;
margin-bottom:20px;
box-shadow:0 8px 32px rgba(0,0,0,0.25);
}

.skill{
background:rgba(255,255,255,0.25);
padding:6px 12px;
border-radius:20px;
margin:4px;
display:inline-block;
}

.project{
background:rgba(255,255,255,0.08);
padding:15px;
border-radius:12px;
margin-bottom:10px;
}

.profile{
width:120px;
height:120px;
border-radius:50%;
border:3px solid white;
object-fit:cover;
}

a{color:white}

</style>

</head>

<body>

<div class="container">

<div class="glass text-center">

${d.image ? `<img src="${d.image}" class="profile mb-3">` : ""}

<h1 id="name"></h1>
<h5 id="title"></h5>

<p>${d.location || ""}</p>

</div>

<div class="glass">

<h3>About</h3>
<p>${d.about || ""}</p>

</div>

<div class="glass">

<h3>Skills</h3>

${skills.map(s=>`<span class="skill">${s}</span>`).join("")}

</div>

<div class="glass">

<h3>Projects</h3>

${projects.map(p=>`

<div class="project">

<h5>${p.title}</h5>

<p>${p.description}</p>

${p.link ? `<a href="${p.link}" target="_blank">
<i class="bi bi-box-arrow-up-right"></i> View
</a>` : ""}

</div>

`).join("")}

</div>

<div class="glass">

<h3>Contact</h3>

<p>${d.email}</p>
<p>${d.phone}</p>

<p>

${d.github ? `<a href="${d.github}"><i class="bi bi-github"></i></a>` : ""}

${d.linkedin ? `<a href="${d.linkedin}"><i class="bi bi-linkedin"></i></a>` : ""}

${d.website ? `<a href="${d.website}"><i class="bi bi-globe"></i></a>` : ""}

</p>

</div>

</div>

<script>

function type(el,text,speed){
let i=0
function run(){
if(i<text.length){
el.innerHTML+=text.charAt(i)
i++
setTimeout(run,speed)
}}
run()
}

type(document.getElementById("name"),"${d.name}",60)
type(document.getElementById("title"),"${d.title}",40)

</script>

</body>

</html>

`
}



async function deployPortfolio(){

try{

Swal.fire({
title:"Deploying Portfolio...",
text:"Please wait while your portfolio is being deployed.",
allowOutsideClick:false,
didOpen:()=>{
Swal.showLoading()
}
})

const token = import.meta.env.VITE_GITHUB_TOKEN
const repo = import.meta.env.VITE_GITHUB_REPO
const username = import.meta.env.VITE_GITHUB_USERNAME

const html = generateHTML(generatedData)

const content = btoa(unescape(encodeURIComponent(html)))

const filename = `${generatedData.name.replace(/\s+/g,"_")}.html`

let sha = null

try{
const existing = await axios.get(
`https://api.github.com/repos/${username}/${repo}/contents/${filename}`
)
sha = existing.data.sha
}catch{}

/* upload file */

await axios.put(

`https://api.github.com/repos/${username}/${repo}/contents/${filename}`,

{
message:"Deploy portfolio",
content:content,
sha:sha
},

{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/vnd.github+json"
}
}

)

/* portfolio url */

const url = `https://${username}.github.io/${repo}/${filename}`

/* wait for GitHub pages */

setTimeout(()=>{

Swal.fire({
title:"Portfolio Deployed!",
text:"Your portfolio is now live.",
icon:"success",
confirmButtonText:"Open Portfolio",
showCancelButton:true,
cancelButtonText:"Close"
}).then((result)=>{

if(result.isConfirmed){
window.open(url,"_blank")
}

})

},10500)

}catch(err){

console.error(err)

Swal.fire({
title:"Deployment Failed",
text:"Something went wrong. Please try again.",
icon:"error"
})

}

}

return(

<div className="container py-5">
    <h2>Welcome {username} 🎉</h2>
    <h2 class="display-5 fw-bold text-primary border-bottom pb-3"> Mr Vinay Portfolio Generator
</h2>

<div className="row justify-content-center">

<div className="col-12 col-lg-5 mb-4">

<PortfolioForm
data={data}
setData={setData}
generatePortfolio={generatePortfolio}
/>

</div>

<div className="col-12 col-lg-7">

{generatedData ? (

<>

<PortfolioPreview data={generatedData}/>

<div className="text-center mt-3">

<button
className="btn btn-success"
onClick={deployPortfolio}
>
Deploy Portfolio
</button>

</div>

</>

) : (

<div className="text-center text-muted p-5 border rounded">

<h5>Your portfolio preview will appear here</h5>
<p>Fill the form and click Generate Portfolio</p>

</div>

)}

</div>

</div>

</div>

)

}

export default Builder