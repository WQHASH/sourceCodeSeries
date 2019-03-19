import axios from 'axios'

const app = {
    state: {
        'fileList': [],
        'problemList': [],
        'renameText': '',
    },
    mutations: {
        'GET_FILELIST': (state) => {
            const getfilelistaboutme =
                "/api/documentcoop/file/getfilelistaboutme/172165467360727040/9e01f214-e20c-4ef5-9c88-fdb9918e1b13";

            let postData = {
                userid: "134217045907607552",
                page: "1",
                number: "10",
                appCode: -1,
                sceneCode: "",
                modelCode: "",
                fileCondition: "false",
                fileCondition: "",
                themeType: '["DocumentCoopDoc","DocumentCoopMap"]'
            };
            axios.post("/api" + getfilelistaboutme, postData)
                .then(response => {
                    if (response.data.ErrorCode.Code == 0) {
                        //数据需要交互到 fileList 组件中去
                        state.fileList = response.data.DataContext;
                    }
                })
                .catch(function (error) {
                    console.log(error, "error");
                });
            
        },
        'RENAME_FILE': (state, renameFile)=>{
            console.log(state, renameFile,"xxx");
            state.fileList[renameFile["seleFileIndex"]]["showname"] = renameFile["renameTextStr"];
            console.log(state.fileList)
            //axion请求
        },


    },
    actions: {
        getFileList({ commit }) {
            commit('GET_FILELIST')
        },
        renameFile({commit},renameFile){
            commit('RENAME_FILE',renameFile)
        },

    }
};

export default app