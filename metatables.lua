-- this metatable allows any value added directly to 'db'
-- to also be added in db.data with additional information
-- this could be used for a million things. maybe make this
-- in typescript for the trail report project
_G.id = 0
local db = {data = {}, atad = {}}
local metatable = {
  __name = "database",
  __index = db.data,
  __newindex = function(_, k, v)
    local current_id = _G.id + 1

    local dataStruct = {
      [current_id] = {
        key = k,
        value = v,
        value_type = type(v)
      }
    }

    _G.id = current_id
    db.data[k] = dataStruct

    -- use atad to search the list by id
    db.atad[v] = current_id
  end,
  __call = function(t)
    -- loop through the db.data table and retrieve either
    -- the key or value that matches "item"
    local function iterate_key_values(item, get)
      -- dump the values
      if get == "empty" or not get then
        for k, v in pairs(db.data) do
          print(k, tostring(v))
        end
      else
        for i, p in pairs(db.data) do
          if get == "key" then
            if i == item then
              return true
            end
          elseif get == "value" then
            if p == item then
              return true
            end
          end
          if type(p) == "table" then
            iterate_key_values(p)
          end
        end
      end
    end

    -- loop through the index table db.atad to find the id (index) of item
    local function iterate_index_table(item)
      for k, _ in pairs(db.atad) do
        if k == item then
          return db.atad[k]
        end
      end
    end

    local function _dump()
      iterate_key_values()
    end

    local _includes = function(_item)
      return iterate_key_values(_item, "key") or false
    end

    local _index_of = function(_item)
      return iterate_index_table(_item) or nil
    end

    local _pop = function()
      local last_item = db.data[#db.data]
      table.remove(db.data, #db.data)
      return last_item
    end

    local _subset = function(start, stop)
      return t, start, stop
    end

    local _from_string = function(string)
      -- appreciably stolen from http://lua-users.org/wiki/SplitJoin
      local function split(s)
        local result = {}
        for match in (s):gmatch(".") do
          table.insert(result, match)
        end
        return result
      end
      return split(string)
    end

    local _when = function(boolean, callback, otherwise)
      return t, boolean, callback, otherwise
    end

    local _out = function(msg, save_to_file, filename)
      if save_to_file then
        local file = io.open(filename, "r+")
        file:write(msg)
        file:close()
        return
      end

      print(msg)
    end

    local _ins = function(key, value)
      db[key] = value
      return db
    end

    local _readonly = function(item)
      return t, item
    end

    local database_methods = {
      includes = _includes,
      index_of = _index_of,
      pop = _pop,
      subset = _subset,
      from_string = _from_string,
      when = _when,
      out = _out,
      ins = _ins,
      readonly = _readonly,
      dump = _dump
    }

    return database_methods
  end
}

setmetatable(db, metatable)

-- test by adding a key and value
local database = db

-- all three insertions work the same way
database["test"] = "incorporeal"
database["fork"] = "another test"
database().ins("chocolate", "this is the item")

database().out("this is a test", true, "./test_file.txt")
database().out("saved 'test_file.txt'")

-- database().dump()
-- local  __db = database().pop()
-- print(__db)

--[[
local hello = database().from_string("hello there, friend")

for _, v in pairs(hello) do
  print(v)
end
]]--

-- print the os.time() call from data.added
