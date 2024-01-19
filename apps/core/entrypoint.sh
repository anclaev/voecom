#!/bin/bash
yarn prisma migrate deploy
node main.js
