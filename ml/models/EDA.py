#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np


# In[2]:


pd.set_option('display.max_seq_items', None)
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)


# In[3]:


# 재료 기본 데이터 가져오기
filepath = "./data/레시피 기본정보.xlsx"
df = pd.read_excel(filepath)
rcp_label = pd.DataFrame.copy(df)

# 재료 정보 데이터 가져오기
filepath = "./data/레시피 재료정보.xlsx"
df = pd.read_excel(filepath)
rcp_igd = pd.DataFrame.copy(df)


# In[4]:


# 재료 데이터 분석

rcp_igd.describe(include="all")


# In[6]:


# 열 추출
rcp_igd = rcp_igd.iloc[:,[0,1,2,3,5]]


# In[7]:


# df 기본 정보 변수로 저장하기
rcp_igd_rows = rcp_igd.shape[0]
rcp_igd_cols = rcp_igd.shape[1]


# In[8]:





# In[9]:





# In[12]:


# 각 레시피 코드 별 재료 개수 파악하기
rcp_igd_summary = pd.DataFrame(rcp_igd.iloc[:,[0,4]].value_counts())
rcp_igd_summary = rcp_igd_summary.sort_values('레시피 코드')


# In[13]:





# In[ ]:


print(rcp_igd


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




