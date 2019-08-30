const content = "
# P+WITW (Where In The World?)

###### This is intended as an asset management dashboard, with a location-centric focus. 
_When a computer signs onto any network and obtains an IP address, the public IP address is obtained, a geolocation calculated, and stored along with other machine information in a database._

### How The Script Works:
- The script is written in Powershell, this does the heavy lifting.
- A Scheduled task will run the script when a network change is detected on the host.
- The script is being deployed on host machines using the existing PW_Logon scripts--specifically the per-office scripts that map network drives. 
- An accompanying bash script ('installTask.bat) copies the necessary files to local folder ['C:\Temp\PWITW'](C:\Temp\PWITW) and installs a scheduled task (an accompanying 'SubmitPCInfo.xml' file).
- When a network change is detected, the local copy of the PS script is run. A copy of the information (formatted in JSON) is saved in the same folder before sending to the database. [PCInfo.json](C:\temp\pwitw\pcinfo.json). 

### How The Application Works:
- The application repository is stored on [github.com](https://github.com/tdotholla/pwitw).
    - `clone https://github.com/tdotholla/pwitw`
- The codebase is written primarily in Javascript/JSX (React) and Node.js with multiple useful NPM packages.
    - A node.js server can build and serve website using Yarn/NPM to install necessary packages. T
    - `yarn | yarn start `
- A DC Server is currently hosting the application: ['WDCWK1700:3000'](http://WDCWK1700:3000)
- The database is hosted on [restdb.io](restdb.io)
- The IP Geolocation API uses ipstack.io (it was ipinfo.io but ran into rate limits)
- The Maps API is Google Maps (would like to use Mapbox in future)


### FEATURES:
- A Map of Markers, grouped into clusters of two types:
    - LAN Clusters: Those workstations whose local IPs are within the PW Subnet of 10.[100-254].X.X
    - WAN Clusters: Those workstations whose local IPs are outside of the above scope, and known public subnets. (192.168.X.X, 10.10.X.X, etc.)
- A Section of charts:
    - Network Graph - [Inner Pie] Percentage of devices within LAN. [Outer Pie] Counts grouped by network activity.
    - Build Graph - Count of devices on each build version.
- A Table: Searchable pivot table
    - Fuzzy search using any text (computer name, build, application, etc...)
    - Sort by clicking the header of any column.
    - Download the filtered results as CSV file with the "Download" button.
    - Hide/Show columns with the "Columns" Button.

#### In Development:
- Uptime Graph - Counts grouped by uptime duration. (undeveloped)

#### CAVEATS:
- At this time, to preserve database size, we only want the last known location instead of a set of locations over time (can form a story of when/where a machine has been).
    - Information is pulled once per minute, so as not to go over rate limits.
- We do not store usernames for GDPR Compliance.
- Written in Powershell; for the windows environment. 
"