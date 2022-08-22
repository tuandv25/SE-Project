# Create a .env file and add this content:
DATABASE_URL='mysql://wotb36hxwkz9:pscale_pw_c80iSdSHxd8qnLNfzJBIKs38bK_lPZdyVusd9-su6A4@d9vgzh030yaj.us-east-3.psdb.cloud/eva_de_eva?sslaccept=strict'
SHADOW_DATABASE_URL='mysql://vynyoq148y1k:pscale_pw_ImVIhWsWypQansZz2-ZTbmF4pjxlYN4EAhrWlk18QGA@693hd03htc08.us-east-4.psdb.cloud/eva_de_eva?sslaccept=strict'

# Open prisma studio:

npx prisma studio

# Execute these command in terminal to run server

#### Step 1

npm install

#### step 2

npx prisma generate

#### step 3

npm run start
