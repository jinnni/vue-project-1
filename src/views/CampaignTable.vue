<template>
    <v-container>
        <v-app id="inspire">
            <v-data-table
                :headers="headers"
                :items="campaignList"
                :items-per-page="20"
                class="elevation-1"
                >
            </v-data-table>
        </v-app>
    </v-container>
</template>
<script>
    export default {
        name: "CampaignTable",
        data: () => {
            return {
                pageInfo: {
                    page: 0,
                    size: 20,
                    campaignStatus: 'ACTIVE',
                },
                headers: [
                    { text: 'ID', value: 'id' },
                    { text: 'Campaign Name', value: 'name' },
                    { text: 'Members Count', value: 'campaignMembersCount' },
                    { text: 'Number of Pre-Survey Questions', value: 'preSurveyQuestionsCount' },
                    { text: 'Number of Post-Survey Questions', value: 'postSurveyQuestionsCount' },
                ],
                campaignList: [],   
            }
        },
        mounted() {
            const pageInfo = this.pageInfo;
            this.$store.dispatch('campaignList', pageInfo).then(resp =>{
                console.log(resp.data.content);
                let list = resp.data.content;
                if (list.length > 0) {
                    list.forEach(item => {
                        this.campaignList.push({
                            id: item.id,
                            name: item.name,
                            campaignMembersCount: item.campaignMembersCount,
                            preSurveyQuestionsCount: item.preSurveyQuestionsCount,
                            postSurveyQuestionsCount: item.postSurveyQuestionsCount,
                        })
                    }); 
                }
                
            });
        }
    };
</script>