-- Create public schema

CREATE SCHEMA IF NOT EXISTS public;

-- Set public as current search path
SET search_path TO public; -- Create tables

-- First create the guild table

CREATE TABLE IF NOT EXISTS "Guilds" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "guildID" VARCHAR(19) UNIQUE NOT NULL,

-- Server Logs
  "joinLogs" BOOLEAN NOT NULL DEFAULT false,
  "leaveLogs" BOOLEAN NOT NULL DEFAULT false,
  "moderationLogs" BOOLEAN NOT NULL DEFAULT false,
  "channelsLogs" BOOLEAN NOT NULL DEFAULT false,
  "messagesLogs" BOOLEAN NOT NULL DEFAULT false,
  "automodLogs" BOOLEAN NOT NULL DEFAULT false,
  "rolesLogs" BOOLEAN NOT NULL DEFAULT false,

-- Starboard
  "starboardChannelID" VARCHAR(19) NOT NULL,
  "starboardRequired" INTEGER NOT NULL DEFAULT 3,

-- Inhibitors
	"disabledCommandsGroups" TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,

-- Welcome & Leave
	"joinMessage" TEXT NOT NULL DEFAULT "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!",
	"leaveMessage" TEXT NOT NULL DEFAULT "It's sad to see you leave {USERNAME}, hope to see you again.",

-- Patreon
  "premium" BOOLEAN NOT NULL DEFAULT false,
  "patron" VARCHAR(19) NOT NULL,

-- Misc
	"leveluptype" TEXT NOT NULL DEFAULT "guild",
  "volume" INTEGER NOT NULL DEFAULT 100,
  "prefix" VARCHAR(10) NOT NULL DEFAULT "p!"
  "language" VARCHAR(10) NOT NULL DEFAULT "en_US"

-- Channels
  "modlogsChannelID" VARCHAR(19) NOT NULL,
  "joinChannelID" VARCHAR(19) NOT NULL,
  "leaveChannelID" VARCHAR(19) NOT NULL,
  "logsChannelID" VARCHAR(19) NOT NULL,

-- Toggles
  "joinmsg" BOOLEAN NOT NULL DEFAULT true,
  "leavemsg" BOOLEAN NOT NULL DEFAULT true,
  "autoroles" BOOLEAN NOT NULL DEFAULT true,
  "perspective" BOOLEAN NOT NULL DEFAULT false,
  "customcmds" BOOLEAN NOT NULL DEFAULT true,
  "starboard" BOOLEAN NOT NULL DEFAULT true,
  "levelroles" BOOLEAN NOT NULL DEFAULT true,
  "modlogs" BOOLEAN NOT NULL DEFAULT true,
  "djmode" BOOLEAN NOT NULL DEFAULT false,
  "levelup" BOOLEAN NOT NULL DEFAULT false,
  "staffbypass" BOOLEAN NOT NULL DEFAULT true,
  "selfroles" BOOLEAN NOT NULL DEFAULT true,
  "invites" BOOLEAN NOT NULL DEFAULT false,
  "perspectiveToxicity" BOOLEAN NOT NULL DEFAULT false,
  "perspectiveSeverToxicity" BOOLEAN NOT NULL DEFAULT false,
  "perspectiveThreat" BOOLEAN NOT NULL DEFAULT true,
  "perspectiveSpam" BOOLEAN NOT NULL DEFAULT true,
  "perspectiveObscene" BOOLEAN NOT NULL DEFAULT false,
  "perspectiveSexuallyExplicit" BOOLEAN NOT NULL DEFAULT false,
  "perspectiveProfanity" BOOLEAN NOT NULL DEFAULT false,

-- Permissions
	"adminIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"modIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"staffIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"djIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,

-- Roles
  "autoRoleIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"selfRoleIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
  "adminRole" VARCHAR(19) NOT NULL,
  "modRole" VARCHAR(19) NOT NULL,
  "staffRole" VARCHAR(19) NOT NULL,
  "djRole" VARCHAR(19) NOT NULL,
  "mutedRole" VARCHAR(19) NOT NULL,
);

-- Create the users table if not available

CREATE TABLE IF NOT EXISTS "Users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
	"userID" VARCHAR(19) NOT NULL,
	"daily" INTEGER NOT NULL DEFAULT 0,
	"xp" INTEGER NOT NULL DEFAULT 0,
	"snowflakes" INTEGER NOT NULL DEFAULT 0,
	"level" INTEGER NOT NULL DEFAULT 0,
	"profilebg" TEXT NOT NULL DEFAULT "default",
	"backgrounds" TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"reps" INTEGER NOT NULL DEFAULT 0,
	"repcooldown" INTEGER NOT NULL DEFAULT 0,
	"title" VARCHAR(30) NOT NULL DEFAULT "No Title Set.",
	"lastUpvote" INTEGER NOT NULL DEFAULT 0,

-- AFK
	"afkTime" INTEGER NOT NULL DEFAULT 0,
	"afkReason" TEXT NOT NULL DEFAULT "No Reason Set.",

-- Patreon
  "paying" BOOLEAN NOT NULL DEFAULT false,
	"guildIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"pledged" INTEGER NOT NULL DEFAULT 0,
	"current" INTEGER NOT NULL DEFAULT 0,
	"tokens" INTEGER NOT NULL DEFAULT 0,
);

-- Create the members table if not available

CREATE TABLE IF NOT EXISTS "Members" (
  "id" SERIAL PRIMARY KEY NOT NULL,
	"userID" VARCHAR(19) NOT NULL,
	"guildID" VARCHAR(19) NOT NULL,
	"xp" INTEGER NOT NULL DEFAULT 0,
	"level" INTEGER NOT NULL DEFAULT 0,
);

-- Create the client table if not available

CREATE TABLE IF NOT EXISTS "Client" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "botID" VARCHAR(19) NOT NULL,

-- Blocked
	"blockedGuildIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"blockedUserIDs" VARCHAR(19)[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
);

-- Create the Commands table if not available

CREATE TABLE IF NOT EXISTS "Commands" (
  "id" SERIAL PRIMARY KEY NOT NULL,
	"guildID" VARCHAR(19) NOT NULL,
	"name" TEXT NOT NULL,
  "content" TEXT NOT NULL,
);
