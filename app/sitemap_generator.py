import json
import re
from datetime import date

# Input Vue.js router file
router_file_path = 'src/router/index.ts'

# Output sitemap file
sitemap_file_path = 'public/toto/sitemap.xml'

# Site's base URL
base_url = 'https://aparteasy.dibodev.com'

# Default values
default_priority = 0.8
default_changefreq = 'monthly'

# Current date
current_date = date.today().strftime('%Y-%m-%d')

# Start of sitemap
sitemap_content = f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

# Open the Vue.js router file
with open(router_file_path, 'r') as file:
    sitemap_info = None
    for line in file:
        # Find any sitemap comments
        match = re.search(r'// sitemap: (.+)', line)
        if match:
            sitemap_info = json.loads(match.group(1))
        # Find any paths
        match = re.search(r'path: \'(.+?)\',', line)
        if match:
            # Extract the path
            path = match.group(1)
            # Format the path
            if path == '/':
                path = ''
            elif path.endswith('(.*)'):
                path = '{catchAll}'
            elif path.endswith('/create'):
                path = path.replace('/create', '/{createId}')
            elif ':searchId' in path:
                path = path.replace(':searchId', '{searchId}')
            elif ':propertyId' in path:
                path = path.replace(':propertyId', '{propertyId}')
            # Get the priority and change frequency
            priority = sitemap_info['priority'] if sitemap_info and 'priority' in sitemap_info else default_priority
            changefreq = sitemap_info['changefreq'] if sitemap_info and 'changefreq' in sitemap_info else default_changefreq
            # Add the URL to the sitemap
            sitemap_content += f'''<url>
    <loc>{base_url.rstrip('/')}/{path.lstrip('/')}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
</url>\n'''
            sitemap_info = None  # Reset the sitemap info

# End of sitemap
sitemap_content += '</urlset>'

# Write the sitemap to a file
with open(sitemap_file_path, 'w') as file:
    file.write(sitemap_content)

print(f'Sitemap written to {sitemap_file_path}')
