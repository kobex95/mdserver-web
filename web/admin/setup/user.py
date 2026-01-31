# coding:utf-8

# ---------------------------------------------------------------------------------
# MW-Linux面板
# ---------------------------------------------------------------------------------
# copyright (c) 2018-∞(https://github.com/midoks/mdserver-web) All rights reserved.
# ---------------------------------------------------------------------------------

# ---------------------------------------------------------------------------------

from flask import request


import core.mw as mw
import thisdb

# 初始化用户信息
def init_admin_user():
    thisdb.initAdminUser()
    return True

