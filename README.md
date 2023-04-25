# 搜索戴森球计划的建筑排列
基于回溯法，全排列和动态规划的算法搜索戴森球计划超市问题。本算法可以极速搜索O(m!n!)的排列，让解决这个问题成为可能。  
__在随机打乱的初始顺序下，经过一点小小的预排列震撼，算法可以在0.3秒内得到对26种组件，38种建筑的BASE集合的可行解。__
## Usage:
对熟悉Javascript的
```
npm i
./main.js --help for usage
```
对不熟悉Javascript的，使用base.txt和upgrade.txt，或等待网页版。

## Reminder
BASE集合需要组件重复2次，默认铁块，UPGRADE集合不需要重复。
## Bugs:
输出同建筑序列的不同组件顺序的情况没有充分测试。
All issues are welcome. 
