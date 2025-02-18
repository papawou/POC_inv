#!/bin/bash

npm i
npx prisma migrate deploy
npm run start