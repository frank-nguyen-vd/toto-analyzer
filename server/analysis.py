import random as rm
import operator
import json
import numpy as np
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
plt.ioff()

PICK_NUMBER = 6
ROUND_NUMBER = 314
UPPER_LIMIT = 49
CHECK_NUMBER = 300


all_lucks = []
sorted_p = {}


def get_all():
	# pool = [i+1 for i in range(UPPER_LIMIT)]
	# for _ in range(ROUND_NUMBER):
	# 	round = rm.sample(pool, PICK_NUMBER)
	# 	round.sort()
	# 	all_lucks.append(round)
	global all_lucks
	with open('lucks.txt', 'r') as source:
		all_lucks = json.load(source)
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

	with open('first_round.txt', 'w') as outfile:
		json.dump(first_round, outfile)
		outfile.close()
	with open('last_round.txt', 'w') as outfile:
		json.dump(last_round, outfile)
		outfile.close()

	with open('random_better_round.txt', 'w') as outfile:
		json.dump(random_better_round, outfile)
		outfile.close()

	print('last round:\n{}'.format(last_round))
	print('random better round:\n{}'.format(random_better_round))
	


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

	#plt.switch_backend('Qt5Agg')
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
	
	#manager = plt.get_current_fig_manager()
	#manager.resize(*manager.window.maxsize())

	#mng = plt.get_current_fig_manager()
	#mng.frame.Maximize(True)
	#figM = plt.get_current_fig_manager()
	#figM.window.showMaximized()
	#plt.show()
	# plt.show()
	plt.savefig('../web/web-client/src/assets/img/overall.png',bbox_inches='tight')

if __name__ == '__main__':
	get_all()
	count_frequence()
	pick_lucks()
	show()
	# check_result(pick_rounds)
	
	





