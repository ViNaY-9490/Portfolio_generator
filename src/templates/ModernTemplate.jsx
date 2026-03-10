import TypingText from "./TypingText"
import "./ModernTemplate.css"

function ModernTemplate({ data }) {

const skills = data.skills || []
const projects = data.projects || []

return (

<div className="glass-container container-fluid">

{/* HEADER */}

<div className="glass-card text-center mb-4">

{data.image && (
<img
src={data.image}
alt="profile"
className="profile-image mb-3"
/>
)}

<h1 className="fw-bold">

<TypingText text={data.name || "Your Name"} />

</h1>

<h5 className="text-light">

<TypingText text={data.title || "Your Title"} speed={40}/>

</h5>

{data.location && (
<p className="small opacity-75 mb-0">
<i className="bi bi-geo-alt me-1"></i>
{data.location}
</p>
)}

</div>


{/* ABOUT */}

{data.about && (

<div className="glass-card mb-4">

<h4 className="section-title">About</h4>

<p className="mb-0">{data.about}</p>

</div>

)}


{/* SKILLS */}

{skills.length > 0 && (

<div className="glass-card mb-4">

<h4 className="section-title">Skills</h4>

<div className="d-flex flex-wrap gap-2">

{skills.map((skill,index)=>(
<span
key={index}
className="skill-pill"
>
{skill}
</span>
))}

</div>

</div>

)}


{/* PROJECTS */}

{projects.length > 0 && (

<div className="glass-card mb-4">

<h4 className="section-title">Projects</h4>

<div className="row g-3">

{projects.map((p,index)=>{

if(!p.title && !p.description && !p.link) return null

return(

<div key={index} className="col-12 col-md-6">

<div className="glass-project">

<h5 className="mb-2">
{p.title || "Project"}
</h5>

{p.description && (
<p className="small mb-2">
{p.description}
</p>
)}

{p.link && (

<a
href={p.link}
target="_blank"
rel="noreferrer"
className="project-link"
>

<i className="bi bi-box-arrow-up-right me-1"></i>
View Project

</a>

)}

</div>

</div>

)

})}

</div>

</div>

)}


{/* CONTACT */}

<div className="glass-card">

<h4 className="section-title">Contact</h4>

{data.email && (
<p>
<i className="bi bi-envelope-fill me-2"></i>
{data.email}
</p>
)}

{data.phone && (
<p>
<i className="bi bi-telephone-fill me-2"></i>
{data.phone}
</p>
)}

<div className="social-links d-flex flex-wrap gap-4 mt-2">

{data.github && (
<a
href={data.github}
target="_blank"
rel="noreferrer"
aria-label="GitHub"
>
<i className="bi bi-github"></i>
</a>
)}

{data.linkedin && (
<a
href={data.linkedin}
target="_blank"
rel="noreferrer"
aria-label="LinkedIn"
>
<i className="bi bi-linkedin"></i>
</a>
)}

{data.website && (
<a
href={data.website}
target="_blank"
rel="noreferrer"
aria-label="Website"
>
<i className="bi bi-globe"></i>
</a>
)}

</div>

</div>

</div>

)

}

export default ModernTemplate