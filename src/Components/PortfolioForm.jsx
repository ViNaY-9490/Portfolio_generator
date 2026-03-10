import React, { useState } from "react";

function PortfolioForm({ data, setData, generatePortfolio }) {

const [errors,setErrors] = useState({})

function handleChange(e){

setData({
...data,
[e.target.name]:e.target.value
})

setErrors({
...errors,
[e.target.name]:""
})

}

function handleImage(e){

const file = e.target.files[0]

if(file){

const reader = new FileReader()

reader.onload = () => {
setData({...data,image:reader.result})
}

reader.readAsDataURL(file)

}

}

function validateForm(){

let newErrors = {}

if(!data.name?.trim()){
newErrors.name = "Name is required"
}

if(!data.title?.trim()){
newErrors.title = "Professional title is required"
}

if(!data.email?.trim() && !data.phone?.trim()){
newErrors.contact = "Provide email or phone"
}

if(!data.about?.trim()){
newErrors.about = "About section is required"
}

setErrors(newErrors)

return Object.keys(newErrors).length === 0

}

function handleGenerate(){

if(validateForm()){
generatePortfolio()
}

}

function addSkill(){

setData({
...data,
skills:[...data.skills,""]
})

}

function updateSkill(value,index){

const updated=[...data.skills]
updated[index]=value

setData({...data,skills:updated})

}

function addProject(){

setData({
...data,
projects:[...data.projects,{title:"",description:"",link:""}]
})

}

function updateProject(index,field,value){

const updated=[...data.projects]

updated[index][field]=value

setData({...data,projects:updated})

}

return(

<div className="card p-3 shadow-sm">

<h4 className="mb-3">Portfolio Details</h4>

{/* BASIC INFORMATION Of User */}

<h6>Basic Info</h6>

<input
className="form-control mb-1"
placeholder="Name"
name="name"
value={data.name}
onChange={handleChange}
/>
{errors.name && <small className="text-danger">{errors.name}</small>}

<input
className="form-control mb-1"
placeholder="Professional Title"
name="title"
value={data.title}
onChange={handleChange}
/>
{errors.title && <small className="text-danger">{errors.title}</small>}

<input
className="form-control mb-2"
placeholder="Location"
name="location"
value={data.location}
onChange={handleChange}
/>

<textarea
className="form-control mb-1"
placeholder="About You"
name="about"
value={data.about}
onChange={handleChange}
/>
{errors.about && <small className="text-danger">{errors.about}</small>}

{/* CONTACT */}

<h6 className="mt-3">Contact</h6>

<input
className="form-control mb-2"
placeholder="Email"
name="email"
value={data.email}
onChange={handleChange}
/>

<input
className="form-control mb-1"
placeholder="Phone"
name="phone"
value={data.phone}
onChange={handleChange}
/>
{errors.contact && <small className="text-danger">{errors.contact}</small>}

{/* SOCIAL LINKS */}

<h6 className="mt-3">Social Links</h6>

<input
className="form-control mb-2"
placeholder="GitHub"
name="github"
value={data.github}
onChange={handleChange}
/>

<input
className="form-control mb-2"
placeholder="LinkedIn"
name="linkedin"
value={data.linkedin}
onChange={handleChange}
/>

<input
className="form-control mb-3"
placeholder="Website"
name="website"
value={data.website}
onChange={handleChange}
/>

{/* SKILLS */}

<h6>Skills</h6>

{data.skills.map((skill,index)=>(

<input
key={index}
className="form-control mb-2"
placeholder="Skill"
value={skill}
onChange={(e)=>updateSkill(e.target.value,index)}
/>

))}

<button
type="button"
className="btn btn-outline-primary btn-sm mb-3"
onClick={addSkill}
>
Add Skill
</button>

{/* PROJECTS */}

<h6>Projects</h6>

{data.projects.map((p,index)=>(

<div key={index} className="border rounded p-2 mb-2">

<input
className="form-control mb-1"
placeholder="Project Title"
value={p.title}
onChange={(e)=>updateProject(index,"title",e.target.value)}
/>

<textarea
className="form-control mb-1"
placeholder="Project Description"
value={p.description}
onChange={(e)=>updateProject(index,"description",e.target.value)}
/>

<input
className="form-control"
placeholder="Project Link"
value={p.link}
onChange={(e)=>updateProject(index,"link",e.target.value)}
/>

</div>

))}

<button
type="button"
className="btn btn-outline-primary btn-sm mb-3"
onClick={addProject}
>
Add Project
</button>

{/* IMAGE */}

<h6>Profile Image (Optional)</h6>

<input
type="file"
accept="image/*"
className="form-control mb-4"
onChange={handleImage}
/>

{/* GENERATE BUTTON when user clicks this it will show the preview of the portfolio*/}

<button
type="button"
className="btn btn-primary w-100"
onClick={handleGenerate}
>
Generate Portfolio
</button>

</div>

)

}

export default PortfolioForm