<style scoped>
.let-hover {
    color: red;
}
</style>
<template>
    <v-container>
        <v-app id="inspire">
            <v-app id="inspire">
                <v-navigation-drawer
                v-model="drawer"
                app
                >
                    <v-list dense>
                        <v-list-item link>
                            <v-list-item-action>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Home</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                <v-app-bar
                app
                color="indigo"
                dark
                >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Sample</v-toolbar-title>
                </v-app-bar>
                <v-main>
                    <v-container
                        class="fill-height"
                        fluid
                    >
                        <v-row
                        align="center"
                        justify="center"
                        >
                        <v-col class="text-center">
                            <v-card
                                class="mx-auto let-hover"
                                max-width="344"
                                outlined
                                v-for="item in dashboardResponseList"
                                v-bind:key="item.id"
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline mb-1">{{item.title}}</v-list-item-title>
                                        <v-list-item-subtitle>{{item.data}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="grey"
                                    ></v-list-item-avatar>
                                </v-list-item>
                                <v-card-actions v-if="item.type != 'none'">
                                    <v-btn color="primary" @click="navigateTo(item.type)" text>{{item.type}}</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        </v-row>
                    </v-container>
                </v-main>
            </v-app>
        </v-app>
    </v-container>
</template>
<script>
    export default {
        name: "Drawer",
        props: {
            source: String,
        },
        data: () => {
            return {
                drawer: null,
                dashboardResponseList:[]
            }
        },
        methods: {
                navigateTo(key){
                switch (key) {
                    case 'campaignTable':
                        this.$router.push('/CampaignTable')
                        break;
                    case 'chart':
                        this.$router.push('/Chart')
                        break;
                    default:
                        break;
                }
            }
        },
        mounted() {
            this.$store.dispatch('loadDashboard').then(resp =>{
                this.dashboardResponseList.push({title:'Users', data: resp.data.usersCount, type: 'chart'})
                this.dashboardResponseList.push({title:'Campaigns', data: resp.data.campaignCount, type: 'campaignTable'})
                this.dashboardResponseList.push({title:'Products', data: resp.data.productsCount, type: 'none'})
                this.dashboardResponseList.push({title:'Survey Questions', data: resp.data.questionCount, type: 'none'})
                this.dashboardResponseList.push({title:'UGCs', data: resp.data.ugcCount, type: 'none'})
            });
            
        }
    };
</script>