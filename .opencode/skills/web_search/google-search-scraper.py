import requests
from bs4 import BeautifulSoup
import time
import random

def sanitize(text):
    if text:
        return text.encode('ascii', 'replace').decode('ascii')
    return "N/A"

def google_search(query, total_pages=1, max_results_per_page=10):
    print(f"--- Searching for '{query}' ---")
    
    random_user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + str(random.randint(100, 125)) + '.0.0.0 Safari/537.36'
    headers = {
        'User-Agent': random_user_agent,
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
    
    all_results = []
    
    for page in range(total_pages):
        start = page * max_results_per_page
        search_url = f"https://html.duckduckgo.com/html/?q={query}&s={start}"
        
        print(f"Requesting page {page + 1}/{total_pages}: {search_url}")
        
        attempt = 0
        success = False
        while attempt < 3:
            try:
                response = requests.get(search_url, headers=headers, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                results = soup.find_all('a', class_='result__a')
                if not results:
                    results = soup.find_all('div', class_='result__snippet')
                
                if not results:
                    results = soup.find_all('h2', class_='result__title')
                
                current_page_results = []
                for result in results:
                    title = sanitize(result.get_text().strip())
                    link = sanitize(result.get('href', 'N/A'))
                    
                    snippet_elem = result.find_parent('div', class_='result')
                    snippet = "N/A"
                    if snippet_elem:
                        s = snippet_elem.find('a', class_='result__snippet')
                        if s:
                            snippet = sanitize(s.get_text().strip())

                    current_page_results.append(f"Title: {title}\nURL: {link}\nSnippet: {snippet}\n---")

                all_results.extend(current_page_results)
                success = True
                break

            except Exception as e:
                print(f"Request failed. Retrying...")
                attempt += 1
                wait_time = random.uniform(5, 10)
                time.sleep(wait_time)
        
        if not success:
            print("Critical failure. Aborting.")
            break

        wait_time = random.uniform(3, 7)
        print(f"Success. Waiting: ({wait_time:.2f}s)")
        time.sleep(wait_time)

    return all_results

if __name__ == "__main__":
    search_keyword = 'abcd'
    results = google_search(search_keyword, total_pages=2)
    
    if results:
        print("\n--- SCRAPING COMPLETE ---")
        for r in results[:10]:
            print(r)
    else:
        print("\n--- NO RESULTS FOUND ---")