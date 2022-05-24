Projektetns Sida är 
https://disturberade-gis.web.app/home

Man kan inte starta en kopian av koden utan node js

ladda ner node js 
Sedan man installera Yarn globalt med command ordet 
npm install -g yarn

naviger in till mappen 
skriv commanden yarn install
sedan starta med kommandet yarn start 

sidan kommer att starta av sig själv 
om det inte funkar gå in på
http://localhost:3000/

Observervera att application kommer inte fungera utan att man skapar en
.env.local fil 
med 

REACT_APP_GOOGLE_API_KEY="DIN_NYCKEL"
REACT_APP_CLOUD_NAME="DIN_NYCKEL"
REACT_APP_UPLOAD_PRESET="DIN_NYCKEL"

