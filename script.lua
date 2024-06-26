-- Lua script for single page application

-- Function to show a specific section
function showSection(sectionId)
    -- Hide all sections
    local sections = document:getElementsByTagName('section')
    for i = 0, sections.length - 1 do
        sections[i].classList:remove('active')
    end

    -- Show the selected section
    local sectionToShow = document:getElementById(sectionId)
    if sectionToShow then
        sectionToShow.classList:add('active')
    end
end

-- Event listener for navigation links
local navLinks = document:getElementsByTagName('nav')[0]:getElementsByTagName('a')
for i = 0, navLinks.length - 1 do
    navLinks[i].onclick = function(event)
        event:preventDefault()  -- Prevent default link behavior
        local sectionId = this:getAttribute('href'):sub(2)  -- Get section ID
        showSection(sectionId)  -- Show the selected section
    end
end

-- Initialize: Show the home section by default
showSection('home')
