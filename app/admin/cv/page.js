'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Download, Eye, Plus, Trash2, Edit3, Check } from 'lucide-react'
import { toast } from 'sonner'
import AdminLayout from '@/components/admin/admin-layout'

// Tab Components
function PersonalInfoTab({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Full Stack Developer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="New York, NY"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://johndoe.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary *
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write a compelling summary of your professional background, skills, and career objectives..."
        />
      </div>
    </div>
  )
}

function SkillsTab({ formData, handleInputChange, handleNestedInputChange, addArrayItem, removeArrayItem }) {
  const [newSkill, setNewSkill] = useState('')
  const [newSkillLevel, setNewSkillLevel] = useState('intermediate')
  const [selectedCategory, setSelectedCategory] = useState('frontend')
  const [editingSkill, setEditingSkill] = useState(null)

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-gray-500', width: '25%' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500', width: '50%' },
    { value: 'advanced', label: 'Advanced', color: 'bg-blue-500', width: '75%' },
    { value: 'expert', label: 'Expert', color: 'bg-green-500', width: '100%' }
  ]

  const categoryIcons = {
    frontend: '🎨',
    backend: '⚙️',
    tools: '🛠️',
    languages: '💻'
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      const skillData = {
        name: newSkill.trim(),
        level: newSkillLevel,
        category: selectedCategory
      }
      
      // Get current skills for the selected category
      const currentCategorySkills = Array.isArray(formData.technicalSkills[selectedCategory]) 
        ? formData.technicalSkills[selectedCategory] 
        : []
      
      // Update technicalSkills with the new skill added to the category
      const updatedSkills = {
        ...formData.technicalSkills,
        [selectedCategory]: [...currentCategorySkills, skillData]
      }
      
      handleInputChange('technicalSkills', updatedSkills)
      setNewSkill('')
      setNewSkillLevel('intermediate')
      toast.success(`${newSkill.trim()} added to ${selectedCategory} skills`)
    } else {
      toast.error('Please enter a skill name')
    }
  }

  const removeSkill = (category, index) => {
    const updatedSkills = { ...formData.technicalSkills }
    const categorySkills = Array.isArray(updatedSkills[category]) ? updatedSkills[category] : []
    updatedSkills[category] = categorySkills.filter((_, i) => i !== index)
    handleInputChange('technicalSkills', updatedSkills)
    toast.success('Skill removed')
  }

  const updateSkillLevel = (category, index, newLevel) => {
    const updatedSkills = { ...formData.technicalSkills }
    const categorySkills = Array.isArray(updatedSkills[category]) ? updatedSkills[category] : []
    updatedSkills[category] = categorySkills.map((skill, i) => 
      i === index ? { ...skill, level: newLevel } : skill
    )
    handleInputChange('technicalSkills', updatedSkills)
  }

  const addSoftSkill = () => {
    if (newSkill.trim()) {
      addArrayItem('softSkills', newSkill.trim())
      setNewSkill('')
      toast.success(`${newSkill.trim()} added to soft skills`)
    }
  }

  const getSkillLevelInfo = (level) => {
    return skillLevels.find(l => l.value === level) || skillLevels[1]
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Skills & Expertise</h3>
        <p className="text-gray-600">Showcase your technical and soft skills with proficiency levels</p>
      </div>
      
      {/* Technical Skills */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">💻</span>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Technical Skills</h4>
            <p className="text-sm text-gray-600">Programming languages, frameworks, and tools</p>
          </div>
        </div>
        
        {/* Add new skill */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Add New Technical Skill</h5>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="frontend">🎨 Frontend</option>
              <option value="backend">⚙️ Backend</option>
              <option value="tools">🛠️ Tools & Technologies</option>
              <option value="languages">💻 Programming Languages</option>
            </select>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Skill name (e.g., React, Python)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {skillLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </button>
          </div>
        </div>

        {/* Display skills by category */}
        {['frontend', 'backend', 'tools', 'languages'].map(category => {
          const skills = formData.technicalSkills[category] || []
          if (skills.length === 0) return null
          
          return (
            <div key={category} className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{categoryIcons[category]}</span>
                <h5 className="text-lg font-semibold text-gray-900 capitalize">{category}</h5>
                <span className="text-sm text-gray-500">({skills.length})</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const levelInfo = getSkillLevelInfo(skill.level || 'intermediate')
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h6 className="font-medium text-gray-900">{skill.name || skill}</h6>
                          <p className="text-sm text-gray-600">{levelInfo.label}</p>
                        </div>
                        <button
                          onClick={() => removeSkill(category, index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Skill Level Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Proficiency</span>
                          <span>{levelInfo.label}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${levelInfo.color}`}
                            style={{ width: levelInfo.width }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Level Selector */}
                      <div className="mt-3">
                        <select
                          value={skill.level || 'intermediate'}
                          onChange={(e) => updateSkillLevel(category, index, e.target.value)}
                          className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {skillLevels.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Soft Skills */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">🤝</span>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Soft Skills</h4>
            <p className="text-sm text-gray-600">Personal attributes and interpersonal abilities</p>
          </div>
        </div>
        
        {/* Add soft skill */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Add New Soft Skill</h5>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Soft skill (e.g., Leadership, Communication)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            />
            <button
              onClick={addSoftSkill}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </button>
          </div>
        </div>

        {/* Display soft skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {formData.softSkills.map((skill, index) => (
            <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
              <span className="font-medium text-green-800">{skill}</span>
              <button
                onClick={() => removeArrayItem('softSkills', index)}
                className="text-green-600 hover:text-green-800 p-1"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        
        {formData.softSkills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🤝</div>
            <p>No soft skills added yet. Add your interpersonal skills above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ExperienceTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    achievements: []
  })
  const [newAchievement, setNewAchievement] = useState('')

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      const experienceToAdd = { ...newExperience }
      addArrayItem('experience', experienceToAdd)
      
      // Show toast with the values before resetting
      toast.success(`${experienceToAdd.title} at ${experienceToAdd.company} added`)
      
      // Reset form after adding
      setNewExperience({
        title: '',
        company: '',
        period: '',
        description: '',
        achievements: []
      })
    } else {
      toast.error('Please fill in job title and company')
    }
  }

  const editExperience = (index) => {
    setEditingIndex(index)
    setNewExperience({ ...formData.experience[index] })
  }

  const updateExperience = () => {
    if (editingIndex >= 0) {
      updateArrayItem('experience', editingIndex, { ...newExperience })
      setEditingIndex(-1)
      setNewExperience({
        title: '',
        company: '',
        period: '',
        description: '',
        achievements: []
      })
    }
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }))
      setNewAchievement('')
    }
  }

  const removeAchievement = (index) => {
    setNewExperience(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Professional Experience</h3>
        {Array.isArray(formData.experience) && formData.experience.length > 0 && (
          <span className="text-sm text-gray-500">
            {formData.experience.length} {formData.experience.length === 1 ? 'experience' : 'experiences'} added
          </span>
        )}
      </div>
      
      {/* Add/Edit Experience Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Experience' : 'Add New Experience'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <input
              type="text"
              value={newExperience.title}
              onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Senior Developer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tech Corp"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <input
              type="text"
              value={newExperience.period}
              onChange={(e) => setNewExperience(prev => ({ ...prev, period: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2022 - Present"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your role and responsibilities..."
          />
        </div>
        
        {/* Achievements */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add achievement"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
            />
            <button
              onClick={addAchievement}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {newExperience.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white rounded border">
                <span className="flex-1 text-sm">{achievement}</span>
                <button
                  onClick={() => removeAchievement(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateExperience}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => {
                  setEditingIndex(-1)
                  setNewExperience({
                    title: '',
                    company: '',
                    period: '',
                    description: '',
                    achievements: []
                  })
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </button>
          )}
        </div>
      </div>
      
      {/* Experience List */}
      <div className="space-y-4">
        {Array.isArray(formData.experience) && formData.experience.map((exp, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium text-gray-900">{exp.title}</h5>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.period}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editExperience(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeArrayItem('experience', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {exp.description && (
              <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
            )}
            
            {exp.achievements && exp.achievements.length > 0 && (
              <div>
                <h6 className="text-sm font-medium text-gray-900 mb-1">Key Achievements:</h6>
                <ul className="text-sm text-gray-700 space-y-1">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        
        {formData.experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No experience added yet. Add your first work experience above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function EducationTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newEducation, setNewEducation] = useState({
    degree: '',
    school: '',
    year: '',
    description: ''
  })

  const addEducation = () => {
    if (newEducation.degree && newEducation.school) {
      addArrayItem('education', { ...newEducation })
      setNewEducation({
        degree: '',
        school: '',
        year: '',
        description: ''
      })
      toast.success(`${newEducation.degree} at ${newEducation.school} added`)
    }
  }

  const editEducation = (index) => {
    setEditingIndex(index)
    setNewEducation({ ...formData.education[index] })
  }

  const updateEducation = () => {
    if (editingIndex >= 0) {
      updateArrayItem('education', editingIndex, { ...newEducation })
      setEditingIndex(-1)
      setNewEducation({
        degree: '',
        school: '',
        year: '',
        description: ''
      })
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Education</h3>
      
      {/* Add/Edit Education Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Education' : 'Add New Education'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School/University *</label>
            <input
              type="text"
              value={newEducation.school}
              onChange={(e) => setNewEducation(prev => ({ ...prev, school: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="University of Technology"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year/Graduation</label>
            <input
              type="text"
              value={newEducation.year}
              onChange={(e) => setNewEducation(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2018 - 2022"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newEducation.description}
            onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Relevant coursework, honors, GPA, etc."
          />
        </div>
        
        <div className="flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateEducation}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => {
                  setEditingIndex(-1)
                  setNewEducation({
                    degree: '',
                    school: '',
                    year: '',
                    description: ''
                  })
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addEducation}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Education
            </button>
          )}
        </div>
      </div>
      
      {/* Education List */}
      <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editEducation(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeArrayItem('education', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {edu.description && (
              <p className="text-sm text-gray-700">{edu.description}</p>
            )}
          </div>
        ))}
        
        {formData.education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No education added yet. Add your educational background above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectsTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: [],
    link: ''
  })
  const [newTechnology, setNewTechnology] = useState('')

  const addProject = () => {
    if (newProject.name && newProject.description) {
      addArrayItem('projects', { ...newProject })
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        link: ''
      })
      toast.success(`${newProject.name} project added`)
    }
  }

  const editProject = (index) => {
    setEditingIndex(index)
    setNewProject({ ...formData.projects[index] })
  }

  const updateProject = () => {
    if (editingIndex >= 0) {
      updateArrayItem('projects', editingIndex, { ...newProject })
      setEditingIndex(-1)
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        link: ''
      })
    }
  }

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }))
      setNewTechnology('')
    }
  }

  const removeTechnology = (index) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
      
      {/* Add/Edit Project Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Project' : 'Add New Project'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="E-commerce Platform"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
            <input
              type="url"
              value={newProject.link}
              onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your project, its features, and impact..."
          />
        </div>
        
        {/* Technologies */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Add technology"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
            />
            <button
              onClick={addTechnology}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {newProject.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tech}
                <button
                  onClick={() => removeTechnology(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateProject}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update
              </button>
              <button
                onClick={() => {
                  setEditingIndex(-1)
                  setNewProject({
                    name: '',
                    description: '',
                    technologies: [],
                    link: ''
                  })
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addProject}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          )}
        </div>
      </div>
      
      {/* Projects List */}
      <div className="space-y-4">
        {formData.projects.map((project, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium text-gray-900">{project.name}</h5>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Project →
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editProject(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeArrayItem('projects', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{project.description}</p>
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {formData.projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No projects added yet. Add your key projects above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function LanguagesTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newLanguage, setNewLanguage] = useState({
    language: '',
    proficiency: 'B2' // CEFR levels: A1, A2, B1, B2, C1, C2
  })

  const proficiencyLevels = [
    { value: 'A1', label: 'A1', description: 'Beginner - Can understand and use familiar everyday expressions' },
    { value: 'A2', label: 'A2', description: 'Elementary - Can communicate in simple and routine tasks' },
    { value: 'B1', label: 'B1', description: 'Intermediate - Can understand the main points of clear standard input' },
    { value: 'B2', label: 'B2', description: 'Upper Intermediate - Can understand the main ideas of complex text' },
    { value: 'C1', label: 'C1', description: 'Advanced - Can express ideas fluently and spontaneously' },
    { value: 'C2', label: 'C2', description: 'Proficient - Can understand with ease virtually everything heard or read' }
  ]

  const addLanguage = () => {
    const languageName = newLanguage.language.trim()
    if (languageName) {
      addArrayItem('languages', { language: languageName, proficiency: newLanguage.proficiency })
      toast.success(`${languageName} added`)
      setNewLanguage({
        language: '',
        proficiency: 'B2'
      })
    } else {
      toast.error('Please enter a language name')
    }
  }

  const editLanguage = (index) => {
    setEditingIndex(index)
    setNewLanguage({ ...formData.languages[index] })
  }

  const updateLanguage = () => {
    if (editingIndex >= 0 && newLanguage.language.trim()) {
      updateArrayItem('languages', editingIndex, { ...newLanguage, language: newLanguage.language.trim() })
      setEditingIndex(-1)
      setNewLanguage({
        language: '',
        proficiency: 'B2'
      })
      toast.success('Language updated')
    } else {
      toast.error('Please enter a language name')
    }
  }

  const cancelEdit = () => {
    setEditingIndex(-1)
    setNewLanguage({
      language: '',
      proficiency: 'B2'
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
        <p className="text-sm text-gray-600 mt-1">Add languages you speak and your proficiency level</p>
      </div>
      
      {/* Add/Edit Language Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Language' : 'Add New Language'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
            <input
              type="text"
              value={newLanguage.language}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., English, Spanish, French"
              onKeyPress={(e) => e.key === 'Enter' && (editingIndex >= 0 ? updateLanguage() : addLanguage())}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level *</label>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, proficiency: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {proficiencyLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateLanguage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update Language
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addLanguage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Language
            </button>
          )}
        </div>
      </div>

      {/* Languages List */}
      <div className="space-y-4">
        {formData.languages && Array.isArray(formData.languages) && formData.languages.length > 0 ? (
          formData.languages.map((lang, index) => {
            const proficiencyInfo = proficiencyLevels.find(p => p.value === lang.proficiency) || proficiencyLevels[3] // Default to B2
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="text-lg font-semibold text-gray-900">{lang.language}</h5>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {proficiencyInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{proficiencyInfo.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editLanguage(index)}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit language"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        removeArrayItem('languages', index)
                        toast.success(`${lang.language} removed`)
                      }}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove language"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No languages added yet. Add your languages above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CertificationsTab({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    credentialId: ''
  })

  const addCertification = () => {
    const certName = newCertification.name.trim()
    if (certName && newCertification.issuer.trim()) {
      addArrayItem('certifications', {
        name: certName,
        issuer: newCertification.issuer.trim(),
        date: newCertification.date.trim(),
        credentialId: newCertification.credentialId.trim()
      })
      toast.success(`${certName} added`)
      setNewCertification({
        name: '',
        issuer: '',
        date: '',
        credentialId: ''
      })
    } else {
      toast.error('Please enter certification name and issuer')
    }
  }

  const editCertification = (index) => {
    setEditingIndex(index)
    setNewCertification({ ...formData.certifications[index] })
  }

  const updateCertification = () => {
    if (editingIndex >= 0 && newCertification.name.trim() && newCertification.issuer.trim()) {
      updateArrayItem('certifications', editingIndex, {
        name: newCertification.name.trim(),
        issuer: newCertification.issuer.trim(),
        date: newCertification.date.trim(),
        credentialId: newCertification.credentialId.trim()
      })
      setEditingIndex(-1)
      setNewCertification({
        name: '',
        issuer: '',
        date: '',
        credentialId: ''
      })
      toast.success('Certification updated')
    } else {
      toast.error('Please enter certification name and issuer')
    }
  }

  const cancelEdit = () => {
    setEditingIndex(-1)
    setNewCertification({
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <p className="text-sm text-gray-600 mt-1">Add your professional certifications and credentials</p>
      </div>
      
      {/* Add/Edit Certification Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {editingIndex >= 0 ? 'Edit Certification' : 'Add New Certification'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
            <input
              type="text"
              value={newCertification.name}
              onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., AWS Certified Developer"
              onKeyPress={(e) => e.key === 'Enter' && (editingIndex >= 0 ? updateCertification() : addCertification())}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
            <input
              type="text"
              value={newCertification.issuer}
              onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Amazon Web Services"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              value={newCertification.date}
              onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 2023 or Jan 2023"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
            <input
              type="text"
              value={newCertification.credentialId}
              onChange={(e) => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., AWS-DEV-123456"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {editingIndex >= 0 ? (
            <>
              <button
                onClick={updateCertification}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Update Certification
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addCertification}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Certification
            </button>
          )}
        </div>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {formData.certifications && Array.isArray(formData.certifications) && formData.certifications.length > 0 ? (
          formData.certifications.map((cert, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-semibold text-gray-900">{cert.name}</h5>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Issued by:</span> {cert.issuer || 'Not specified'}
                    </p>
                    {cert.date && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Date:</span> {cert.date}
                      </p>
                    )}
                    {cert.credentialId && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Credential ID:</span> {cert.credentialId}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editCertification(index)}
                    className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit certification"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      removeArrayItem('certifications', index)
                      toast.success(`${cert.name} removed`)
                    }}
                    className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove certification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No certifications added yet. Add your certifications above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AdditionalTab({ formData, handleInputChange, addArrayItem, removeArrayItem, updateArrayItem }) {
return <div>Additional Tab - Coming Soon</div>
}

function SettingsTab({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">CV Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Template Style</label>
          <select
            value={formData.template}
            onChange={(e) => handleInputChange('template', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="creative">Creative</option>
          </select>
        </div>
        
        {/* Color Scheme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
          <select
            value={formData.colorScheme}
            onChange={(e) => handleInputChange('colorScheme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="red">Red</option>
            <option value="gray">Gray</option>
          </select>
        </div>
        
        {/* Layout */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
          <select
            value={formData.layout}
            onChange={(e) => handleInputChange('layout', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="single">Single Column</option>
            <option value="two-column">Two Column</option>
          </select>
        </div>
        
        {/* Photo Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo Settings</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.showPhoto}
                onChange={(e) => handleInputChange('showPhoto', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Include photo in CV</span>
            </label>
            {formData.showPhoto && (
              <input
                type="url"
                value={formData.photoUrl}
                onChange={(e) => handleInputChange('photoUrl', e.target.value)}
                placeholder="Photo URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Preview */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">Template Preview</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className={`h-16 rounded-lg mb-4 ${
            formData.colorScheme === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-800' :
            formData.colorScheme === 'green' ? 'bg-gradient-to-r from-green-600 to-green-800' :
            formData.colorScheme === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-800' :
            formData.colorScheme === 'red' ? 'bg-gradient-to-r from-red-600 to-red-800' :
            'bg-gradient-to-r from-gray-600 to-gray-800'
          }`}>
            <div className="h-full flex items-center px-4">
              <div className="text-white">
                <div className="font-bold text-lg">{formData.fullName || 'Your Name'}</div>
                <div className="text-sm opacity-90">{formData.title || 'Your Title'}</div>
              </div>
            </div>
          </div>
          
          <div className={`grid gap-4 ${formData.layout === 'two-column' ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CVManagement() {
  const [cvData, setCvData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [showPreview, setShowPreview] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    
    // Skills
    technicalSkills: {
      frontend: [],
      backend: [],
      tools: [],
      languages: []
    },
    softSkills: [],
    
    // Experience
    experience: [],
    
    // Education
    education: [],
    
    // Projects
    projects: [],
    
    // Certifications
    certifications: [],
    
    // Languages
    languages: [],
    
    // Additional Info
    additionalInfo: {
      interests: [],
      volunteer: [],
      publications: []
    },
    
    // Settings
    template: 'modern',
    colorScheme: 'blue',
    layout: 'single',
    showPhoto: false,
    photoUrl: ''
  })

  // Default skills to restore
  const getDefaultSkills = () => {
    return {
      frontend: [
        { name: 'React', level: 'expert', category: 'frontend' },
        { name: 'Next.js', level: 'expert', category: 'frontend' },
        { name: 'TypeScript', level: 'advanced', category: 'frontend' },
        { name: 'JavaScript', level: 'expert', category: 'frontend' },
        { name: 'HTML5', level: 'expert', category: 'frontend' },
        { name: 'CSS3', level: 'expert', category: 'frontend' },
        { name: 'Tailwind CSS', level: 'advanced', category: 'frontend' },
        { name: 'Framer Motion', level: 'advanced', category: 'frontend' }
      ],
      backend: [
        { name: 'Node.js', level: 'expert', category: 'backend' },
        { name: 'Express.js', level: 'advanced', category: 'backend' },
        { name: 'PostgreSQL', level: 'advanced', category: 'backend' },
        { name: 'MongoDB', level: 'intermediate', category: 'backend' },
        { name: 'REST APIs', level: 'advanced', category: 'backend' },
        { name: 'GraphQL', level: 'intermediate', category: 'backend' }
      ],
      tools: [
        { name: 'Git', level: 'advanced', category: 'tools' },
        { name: 'Docker', level: 'intermediate', category: 'tools' },
        { name: 'AWS', level: 'intermediate', category: 'tools' },
        { name: 'Vercel', level: 'advanced', category: 'tools' },
        { name: 'Figma', level: 'intermediate', category: 'tools' },
        { name: 'VS Code', level: 'expert', category: 'tools' },
        { name: 'Linux', level: 'intermediate', category: 'tools' }
      ],
      languages: [
        { name: 'JavaScript', level: 'expert', category: 'languages' },
        { name: 'TypeScript', level: 'advanced', category: 'languages' },
        { name: 'Python', level: 'intermediate', category: 'languages' },
        { name: 'SQL', level: 'advanced', category: 'languages' },
        { name: 'HTML', level: 'expert', category: 'languages' },
        { name: 'CSS', level: 'expert', category: 'languages' }
      ]
    }
  }

  // Convert string skills to object format
  const convertSkillsToObjects = (skills) => {
    if (!skills || typeof skills !== 'object') {
      return getDefaultSkills()
    }

    const converted = {
      frontend: [],
      backend: [],
      tools: [],
      languages: []
    }

    // Convert each category
    Object.keys(converted).forEach(category => {
      const categorySkills = Array.isArray(skills[category]) ? skills[category] : []
      converted[category] = categorySkills.map(skill => {
        // If already an object, return as is
        if (typeof skill === 'object' && skill !== null && skill.name) {
          return {
            name: skill.name,
            level: skill.level || 'intermediate',
            category: skill.category || category
          }
        }
        // If string, convert to object
        if (typeof skill === 'string') {
          return {
            name: skill,
            level: 'intermediate',
            category: category
          }
        }
        return null
      }).filter(Boolean)
    })

    // If all categories are empty, return default skills
    const hasAnySkills = Object.values(converted).some(arr => arr.length > 0)
    return hasAnySkills ? converted : getDefaultSkills()
  }

  // Fetch CV data
  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch('/api/admin/cv', {
        credentials: 'include' // Include cookies for authentication
      })
        const data = await response.json()
        
        if (data.cv) {
          setCvData(data.cv)
          
          // Ensure languages is properly loaded - use exactly what's in the database
          const loadedLanguages = Array.isArray(data.cv.languages) ? data.cv.languages : []
          
          // Convert and load technical skills (with defaults if empty)
          const loadedTechnicalSkills = convertSkillsToObjects(data.cv.technicalSkills)
          
          // Load soft skills with defaults if empty
          const defaultSoftSkills = ['Problem Solving', 'Team Collaboration', 'Communication', 'Project Management', 'Leadership']
          const loadedSoftSkills = Array.isArray(data.cv.softSkills) && data.cv.softSkills.length > 0 
            ? data.cv.softSkills 
            : defaultSoftSkills
          
          // Load experience with proper array validation
          const loadedExperience = Array.isArray(data.cv.experience) ? data.cv.experience : []
          
          console.log('Loading CV data:', {
            languages: loadedLanguages,
            languagesCount: loadedLanguages.length,
            technicalSkills: loadedTechnicalSkills,
            softSkills: loadedSoftSkills,
            experience: loadedExperience,
            experienceCount: loadedExperience.length,
            experienceData: JSON.stringify(loadedExperience)
          })
          
          setFormData({
            fullName: data.cv.fullName || '',
            title: data.cv.title || '',
            email: data.cv.email || '',
            phone: data.cv.phone || '',
            location: data.cv.location || '',
            website: data.cv.website || '',
            linkedin: data.cv.linkedin || '',
            github: data.cv.github || '',
            summary: data.cv.summary || '',
            technicalSkills: loadedTechnicalSkills, // Use converted skills with defaults
            softSkills: loadedSoftSkills, // Use loaded or default soft skills
            experience: loadedExperience, // Use properly validated experience array
            education: Array.isArray(data.cv.education) ? data.cv.education : [],
            projects: Array.isArray(data.cv.projects) ? data.cv.projects : [],
            certifications: Array.isArray(data.cv.certifications) ? data.cv.certifications : [],
            languages: loadedLanguages, // Use the properly formatted array
            additionalInfo: data.cv.additionalInfo || { interests: [], volunteer: [], publications: [] },
            template: data.cv.template || 'modern',
            colorScheme: data.cv.colorScheme || 'blue',
            layout: data.cv.layout || 'single',
            showPhoto: data.cv.showPhoto || false,
            photoUrl: data.cv.photoUrl || ''
          })
          toast.success('CV data loaded successfully!')
        }
      } catch (error) {
        console.error('Error fetching CV data:', error)
        toast.error('Failed to load CV data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchCVData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Ensure languages is always an array (explicitly set, even if empty)
      const languagesArray = Array.isArray(formData.languages) ? formData.languages : []
      
      // Ensure experience is always an array (explicitly set, even if empty)
      const experienceArray = Array.isArray(formData.experience) ? formData.experience : []
      
      const dataToSave = {
        ...formData,
        languages: languagesArray, // Explicitly set to ensure it's saved
        experience: experienceArray // Explicitly set to ensure all experiences are saved
      }
      
      console.log('Saving CV data:', { 
        languages: dataToSave.languages,
        languagesCount: dataToSave.languages.length,
        experience: dataToSave.experience,
        experienceCount: dataToSave.experience.length,
        experienceData: JSON.stringify(dataToSave.experience),
        formDataExperience: formData.experience,
        formDataExperienceType: typeof formData.experience,
        formDataExperienceIsArray: Array.isArray(formData.experience)
      })
      
      const response = await fetch('/api/admin/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(dataToSave),
      })

      if (response.ok) {
        const data = await response.json()
        setCvData(data.cv)
        toast.success('CV saved successfully!')
      } else {
        // Try to get error message from response
        let errorMessage = 'Failed to save CV. Please try again.'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage
        }
        
        console.error('Save failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorMessage
        })
        
        toast.error(`Failed to save CV: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error saving CV:', error)
      
      // Provide more specific error messages
      let errorMessage = 'Error saving CV. Please check your connection.'
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Network error: Unable to connect to server. Please check if the server is running.'
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }))
  }

  const addArrayItem = (field, newItem) => {
    setFormData(prev => {
      const currentValue = prev[field]
      const arrayValue = Array.isArray(currentValue) ? currentValue : []
      return {
        ...prev,
        [field]: [...arrayValue, newItem]
      }
    })
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => {
      const currentValue = prev[field]
      const arrayValue = Array.isArray(currentValue) ? currentValue : []
      return {
        ...prev,
        [field]: arrayValue.filter((_, i) => i !== index)
      }
    })
  }

  const updateArrayItem = (field, index, updatedItem) => {
    setFormData(prev => {
      const currentValue = prev[field]
      const arrayValue = Array.isArray(currentValue) ? currentValue : []
      return {
        ...prev,
        [field]: arrayValue.map((item, i) => i === index ? updatedItem : item)
      }
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading CV data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CV Management</h1>
              <p className="text-gray-600 mt-1">Create and manage your professional CV</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? 'Saving...' : 'Save CV'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'personal', label: 'Personal Info' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'experience', label: 'Experience' },
                    { id: 'education', label: 'Education' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'certifications', label: 'Certifications' },
                    { id: 'languages', label: 'Languages' },
                    { id: 'additional', label: 'Additional' },
                    { id: 'settings', label: 'Settings' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'personal' && (
                  <PersonalInfoTab 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                  />
                )}
                {activeTab === 'skills' && (
                  <SkillsTab 
                    formData={formData} 
                    handleInputChange={handleInputChange}
                    handleNestedInputChange={handleNestedInputChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                  />
                )}
                {activeTab === 'experience' && (
                  <ExperienceTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'education' && (
                  <EducationTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'projects' && (
                  <ProjectsTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'certifications' && (
                  <CertificationsTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'languages' && (
                  <LanguagesTab 
                    formData={formData} 
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'additional' && (
                  <AdditionalTab 
                    formData={formData} 
                    handleInputChange={handleInputChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    updateArrayItem={updateArrayItem}
                  />
                )}
                {activeTab === 'settings' && (
                  <SettingsTab 
                    formData={formData} 
                    handleInputChange={handleInputChange}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            {showPreview && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CV Preview</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{formData.fullName || 'Your Name'}</h4>
                    <p className="text-sm text-gray-600">{formData.title || 'Your Title'}</p>
                    <p className="text-sm text-gray-500">{formData.email || 'your@email.com'}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Summary</h5>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {formData.summary || 'Your professional summary will appear here...'}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Experience</h5>
                    <div className="space-y-2">
                      {formData.experience.slice(0, 2).map((exp, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium text-gray-900">{exp.title || 'Job Title'}</p>
                          <p className="text-gray-600">{exp.company || 'Company'}</p>
                        </div>
                      ))}
                      {formData.experience.length === 0 && (
                        <p className="text-sm text-gray-500">No experience added yet</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <a
                    href="/api/cv/download"
                    target="_blank"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  )
}
