-- Lua equivalent of the provided JavaScript functionality

-- JSON library for Lua (example: use cjson or another Lua JSON library)
local json = require("cjson")

-- Table to store changed blocks and other data
local changedBlocks = {}
local worldSeed = nil
local worldSize = nil
local timeout = nil

-- Function to update data in localStorage or similar (not directly provided in Lua)
local function updateData()
    local data = json.encode({
        worldSeed = worldSeed,
        changedBlocks = changedBlocks,
        worldSize = worldSize,
        version = 1
    })
    -- Implement localStorage or data saving mechanism appropriate for Lua environment
    -- Example: save data to file or store in a Lua table for persistent storage
    -- localStorage.setItem("savedGame", data)
end

-- Function to clear/reset data
local function clearData()
    worldSeed = nil
    changedBlocks = {}
    updateData()  -- Call updateData function to save changes
end

-- Setter function for world seed
local function setWorldSeed(seed)
    worldSeed = seed
    updateData()  -- Call updateData function to save changes
end

-- Getter function for world seed
local function getWorldSeed()
    return worldSeed
end

-- Setter function for world size
local function setWorldSize(size)
    worldSize = size
    updateData()  -- Call updateData function to save changes
end

-- Getter function for world size
local function getWorldSize()
    return worldSize
end

-- Function to add/change a block in the world
local function addBlockChange(block)
    local key = "p" .. block.p[0] .. "_" .. block.p[1] .. "_" .. block.p[2]
    changedBlocks[key] = {
        a = block.add and 1 or 0,
        bt = block.bt
    }
    -- Implement timeout or delay logic as needed in Lua environment
    -- Example: use coroutine and timer libraries for setTimeout-like behavior
    if timeout == nil then
        timeout = setTimeout(function()
            Date.now()
            updateData()  -- Call updateData function to save changes
            timeout = nil  -- Reset timeout variable
        end, 3000)
    end
end

-- Function to get all changed blocks
local function getChangedBlocks()
    local blocks = {}
    for key, value in pairs(changedBlocks) do
        local p = string.sub(key, 2):split("_"):map(function(s)
            return tonumber(s)
        end)
        table.insert(blocks, {
            p = p,
            add = value.a ~= 0,
            bt = value.bt
        })
    end
    return blocks
end

-- Module table to export functions
local exports = {
    updateData = updateData,
    clearData = clearData,
    setWorldSeed = setWorldSeed,
    getWorldSeed = getWorldSeed,
    setWorldSize = setWorldSize,
    getWorldSize = getWorldSize,
    addBlockChange = addBlockChange,
    getChangedBlocks = getChangedBlocks
}

return exports
