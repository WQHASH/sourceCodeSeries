import axios from 'axios'

const app = {
    state: {
        'fileList': [],
        'problemList': []
    },
    mutations: {
        'GET_FILELIST': (state) => {
            const getfilelistaboutme =
                "/api/documentcoop/file/getfilelistaboutme/172165467360727040/7869013e-31ae-46ac-ac1e-f7d2ce209eee";

            let postData = {
                userid: "134217045907607552",
                page: "1",
                number: "20",
                appCode: -1,
                sceneCode: "",
                modelCode: "",
                fileCondition: "false",
                fileCondition: "",
                themeType: '["DocumentCoopDoc","DocumentCoopMap"]'
            };
            axios.post("/api" + getfilelistaboutme, postData)
                .then(response => {
                    console.log(response, "response");
                    if (response.data.ErrorCode.Code == 0) {
                        //数据需要交互到 fileList 组件中去
                        state.fileList = response.data.DataContext;
                    }
                })
                .catch(function (error) {
                    console.log(error, "error");
                });
            
        }

    },
    actions: {
        getFileList({ commit }) {
            commit('GET_FILELIST')
        }

    }
};

export default app