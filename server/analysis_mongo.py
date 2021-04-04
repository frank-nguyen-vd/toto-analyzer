import random as rm
import operator

import numpy as np
import pymongo
from config import *
from bson.json_util import dumps, RELAXED_JSON_OPTIONS

import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
plt.ioff()

all_lucks = []
sorted_p = {}

client = pymongo.MongoClient(MONGO_URL, connect=False)
db = client[MONGO_DB]
table = db[MONGO_TABLE]

def get_all():
	# pool = [i+1 for i in range(UPPER_LIMIT)]
	# for _ in range(ROUND_NUMBER):
	# 	round = rm.sample(pool, PICK_NUMBER)
	# 	round.sort()
	# 	all_lucks.append(round)
	data_table = list(table.find().sort("number", pymongo.DESCENDING))
	# with open('lucks.txt', 'w') as outfile:
	# 		content = dumps(data_table[:5], json_options=RELAXED_JSON_OPTIONS)
	# 		outfile.write(content)
	# 		outfile.close()

	for data in data_table:
		lucks = data['lucks']
		# lucks.append(data['additional'])
		all_lucks.append(lucks)

	# print(all_lucks)

	# with open('lucks.txt', 'r') as source:
	# 	all_lucks = json.load(source)
		# source.close()
	# return history[:CHECK_NUMBER]

def count_frequence():
	# print(all_lucks)
	p = {}
	for number in range(UPPER_LIMIT):
		time = 0
		for round in all_lucks:
			for luck in round:
				if luck == number+1:
					time += 1
		p[number+1] = time
	global sorted_p
	sorted_p = sorted(p.items(), key=operator.itemgetter(1))
	sorted_p.reverse()

def pick_lucks():
	# sorted_p = sorted(p.items(), key=operator.itemgetter(1))
	# sorted_p.reverse()
	print(sorted_p)
	# print(sorted_p[:2])
	# print(sorted_p[-2:])
	first_round = [pair[0] for pair in sorted_p[:PICK_NUMBER]]
	last_round = [pair[0] for pair in sorted_p[-PICK_NUMBER:]]
	pool = [i+1 for i in range(UPPER_LIMIT)]
	random_all_round = rm.sample(pool, PICK_NUMBER)
	random_better_round = rm.sample(first_round+last_round, PICK_NUMBER)
	first_round.sort()
	last_round.sort()
	random_better_round.sort()
	print('first round:\n{}'.format(first_round))
	print('last round:\n{}'.format(last_round))
	# print('random better round:\n{}'.format(random_better_round))
	


def check_result(picks):
	print('pick round:\n{}'.format(picks))
	with open('lucks.txt', 'r') as source:
		history = json.load(source)

	for round in history[CHECK_NUMBER:]:
		win = 0
		for luck in picks:
			for num in round:
				if luck == num:
					win += 1
		if win >= 3:
			print(win)
			print('luck round:\n{}'.format(round))

def fill_colors():
	colors = []
	last_draw = all_lucks[0]
	print('last draw:\n{}'.format(last_draw))

	for idx, ele in enumerate(sorted_p):
		if ele[0] in last_draw:
			colors.append('r')
		elif idx < 6:
			colors.append('g')
		elif idx > 42:
			colors.append('b')
		else:
			colors.append('#75bbfd')
	return colors

def draw_bars():
	last_draw = all_lucks[0]

	x_last = []
	y_last = []
	x_most = []
	y_most = []
	x = []
	y = []

	for idx, ele in enumerate(sorted_p):
		if ele[0] in last_draw:
			x_last.append(ele[0])
			y_last.append(ele[1])
		elif idx < 6:
			x_most.append(ele[0])
			y_most.append(ele[1])
		# elif idx > 42:
		else:
			x.append(ele[0])
			y.append(ele[1])

	plt.bar(x_last, y_last, 0.5, color='r', label='Last Draw')
	plt.bar(x_most, y_most, 0.5, color='b', label='Most Draw')
	plt.bar(x, y, 0.5, color='lightskyblue')
	plt.legend(loc='upper right')

def show():
	# plt.switch_backend('Qt5Agg')
	x = [ele[0] for ele in sorted_p]
	y = [ele[1] for ele in sorted_p]
	plt.xlim((0, 50))
	plt.ylim((0, 75))
	plt.xlabel('lucky numbers')
	plt.ylabel('frequence')
	plt.xticks(np.arange(1, 50, 1))

	draw_bars()

	for m,n in zip(x,y):
		plt.text(m, n+0.05, '%d' % n, ha='center', va= 'bottom')

	# plt.show()
	# figM = plt.get_current_fig_manager()
	# figM.window.showMaximized()

	plt.savefig(IMG_PATH, bbox_inches='tight')
	# plt.savefig('../web/web-client/src/assets/img/overall.png',bbox_inches='tight')


if __name__ == '__main__':
	get_all()
	count_frequence()
	pick_lucks()
	show()
	
