
 Source code series:
    git简单的记录：
        1. 一台电脑多个github账号
        2. 一个账号多台电脑上的使用，（以及多人协作开发时，github组员的邀请）
        3. git分支的使用介绍

        ①：一台电脑多个github账号的使用，那么这时候就要配置好ssh，
            ssh_pub（公钥）他就像一个公开的用户账号，将它配置给github，
            本地电脑中保存了 私钥，他就像用户的密码一样，如果账号和密码匹配
            那么说明这个用户相对github来说是合法的，则可以push项目。
           注意点: 当github1,于gitub2两个账号都存在，有可能github2的账号在push
            项目时，会报没有权限，那么则需要去.git中的配置文件里，更改 [remote "origin"]的url => 更改的也就是 ssh -> config里的 主机，邮箱之类的           

        ②：一个账号多台电脑上的使用，这时候就需要分配多个ssh密码给用户   
          github组员的邀请：=>注意的是Email消息一定要记得打开，或者直接发送链接（在当前用户下开网页即可）

        ③：git分支的使用  
            当clone完项目，需要提交时 会有 git pull操作，（前提是有分支情况下，默认master）
            它会报如下提示:
                If you wish to set tracking information for this branch you can do so with:
                git branch --set-upstream-to=origin/<branch> feture-temptest

            解决方法：   [origin/feture-temptest feture-temptest ] => [origin/远端分支名 本地分支名]
                 git branch --set-upstream-to origin/feture-temptest feture-temptest  
                 当做完这些可 查看本地分支和哪个远程分支相关联           
                  git branch --vv => 查看本地分支和哪个远程分支相关联
                  git branch --v => 查看远程仓库信息
                  git remote -vv => 查看远程关联的地址

             切换分支的好处在于每次的切换，整个项目的内容就随之改变了，这一切归功于 .git中config的
                   [branch "feture-temptest"]
                 	   remote = origin
	                     merge = refs/heads/feture-temptest[master] =>这里没设置之前默认 master

             个人认为关联 分支很重要，因为当切换分支的时候git找的就是--set-upstream-to设置的,否则为master

             git 也在不断的更新 所以在本地分支关联远程分支 也出现了2中写法：
              old: => git branch --set-upstream-to origin/branch-name
                      git branch -u origin/branch-name [本人没试过]
              new: => git branch --track origin/branch-name

              撤销本地与远程分支的关联
                      git branch --unset-upstream


<!-- 简单的 -->
<!-- https://www.cnblogs.com/sjhsszl/p/8708471.html -->
<!-- 详细的 -->
<!-- https://blog.csdn.net/azureternite/article/details/76154807 --> 
<!-- 超详细的 -->
<!-- https://blog.csdn.net/TTKatrina/article/details/79288238 -->
  理解 git pull:  [使用git fetch和git rebase处理多人开发同一分支的问题（）]       
                  [解决了使用git pull远端被人修改时，和本地出现冲突，自动merge出现的记录，如果多了则会更乱]

    git pull == git fetch 和   git merge   
                git fetch: 他会把远程的提交拉去到本地仓库，但是他并不是直接放在当前分支后面，而是在最后一次push的那个节点
                在拉去一个新的分支，[这样就多出了一条分支了]

                git merge: git pull在拉取完之后,就会将新建的分支跟你原来的分支进行合并，
                [这样能最后一次push的节点，到fetch出来的分支，就合并成了一条新的分支]

    git pull --rebase origin (origin-branch-name)  => 当git pull 
                这里用到  --rebase 他属于优化的，解决了fetch的的提交日志，到git log中只会出现最后一次的操作
