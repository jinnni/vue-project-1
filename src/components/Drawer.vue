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
                <v-toolbar-title>PJdaren</v-toolbar-title>
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
                                class="mx-auto"
                                max-width="344"
                                outlined
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline mb-1">Users</v-list-item-title>
                                        <v-list-item-subtitle>{{data.usersCount}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="grey"
                                    ></v-list-item-avatar>
                                </v-list-item>
                            </v-card>
                            <v-card
                                class="mx-auto"
                                max-width="344"
                                outlined
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline mb-1">Campaigns</v-list-item-title>
                                        <v-list-item-subtitle>{{data.campaignCount}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="grey"
                                    ></v-list-item-avatar>
                                </v-list-item>
                            </v-card>
                            <v-card
                                class="mx-auto"
                                max-width="344"
                                outlined
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline mb-1">Products</v-list-item-title>
                                        <v-list-item-subtitle>{{data.productsCount}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="grey"
                                    ></v-list-item-avatar>
                                </v-list-item>
                            </v-card>
                            <v-card
                                class="mx-auto"
                                max-width="344"
                                outlined
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline mb-1">UGC</v-list-item-title>
                                        <v-list-item-subtitle>{{data.ugcCount}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar
                                        tile
                                        size="80"
                                        color="grey"
                                    ></v-list-item-avatar>
                                </v-list-item>
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
                data: {}
            }
        },
        mounted() {
            this.$store.dispatch('loadDashboard').then(resp =>{
                this.data.usersCount = resp.data.usersCount;
                this.data.articlesCount = resp.data.articlesCount;
                this.data.campaignCount = resp.data.campaignCount;
                this.data.productsCount = resp.data.productsCount;
                this.data.questionCount = resp.data.questionCount;
                this.data.ugcCount = resp.data.ugcCount;
            });
            
        }
    };
</script>