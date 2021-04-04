# -*- coding: utf-8 -*-

import time
import json
import datetime
import requests
from urllib.parse import urlencode
import re
from bs4 import BeautifulSoup
from requests.exceptions import ConnectionError
import threading
import queue

NUMBER_THREAD = 50
all_lucks = []
lock = threading.RLock()
q = queue.Queue()

index_url = 'http://www.singaporepools.com.sg/DataFileArchive/Lottery/Output/toto_result_draw_list_en.html'
detail_url = 'http://www.singaporepools.com.sg/en/product/sr/Pages/toto_results.aspx'

def handle_detail_page(q):
	while not q.empty():
		item = q.get()
		detail = get_page_detail(item[0])
		if detail:
			flag = parse_page_detail(detail)
			if not flag:
				print('Fail:{}'.format(item[1]))
				q.put(item)
			else:
				# print(item[1])
				q.task_done()


def get_page_index():
	val = datetime.datetime.now().strftime("%Yy%mm%dd%Hh%Mm")
	data = {'v': val}
	params = urlencode(data)
	url = index_url + '?' + params
	response = requests.get(url)
	if response.status_code == 200:
	    return response.text

def parse_page_index(html):
	pattern = re.compile("queryString='(.*?)' value=.*?'True'>(.*?)</option>", re.S)
	items = re.findall(pattern, html)
	print(len(items))
	for item in items:
		yield item

def get_page_detail(param):
	url = detail_url + '?' + param
	try:
		response = requests.get(url)
		if response.status_code == 200:
		    return response.text
	except ConnectionError:
		print('connection')
		return None

def get_text(soup, tag, class_name):
	ele = soup.find(tag, class_=class_name)
	if ele:
		return ele.text
	else:
		print('fail parse')
		return None

def parse_page_detail(html):
	soup = BeautifulSoup(html, 'html.parser')
	lucks = []
	for i in range(6):
		luck = get_text(soup, 'td', 'win'+str(i+1))
		if luck:
			lucks.append(int(luck))
		else:
			return False
	additional = get_text(soup, 'td', 'additional')
	if additional:
		lucks.append(int(additional))
	else:
		return False
	print(lucks)

	global all_lucks
	with lock:
		all_lucks.append(lucks)
		with open('lucks.txt', 'w') as outfile:
			json.dump(all_lucks, outfile)
			outfile.close()
	return True

def main():
	threads = []

	text = get_page_index()
	for item in parse_page_index(text):
		q.put(item)
		# th = threading.Thread(target=handle_detail_page, args=(item[0], item[1], ))
		# th.setDaemon(False)
		# threads.append(th)
		# th.start()
	
	# here sleep is must
	time.sleep(0.1)

	# the number of thread cannot be small
	for i in range(NUMBER_THREAD):
	    th = threading.Thread(target=handle_detail_page, args=(q, ))
	    # th.setDaemon(True)
	    threads.append(th)
	    th.start()

	# q.join()

	for th in threads:
	    th.join()	

	print(len(all_lucks))


if __name__ == '__main__':
	# start = datetime.datetime.now()
	main()
	# end = datetime.datetime.now()
	# print(end-start)
