<template>
<div class="jumbotron vertical-center">
    <div class="container">
        <!-- CDN for Bootswatch -->
        <link rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/cerulean/bootstrap.min.css"
        crossorigin="anonymous">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="text-center bg-primary text-white" style="border-radius:10px;">
                Games Library</h1>
            </div>
            <br><br>

            <!-- Alert message -->
            <b-alert variant="success" v-if="showMessage" show>{{message}}</b-alert>
            <br>

            <!--Menu controls -->
            <button type="button" class="btn btn-success btn-sm" v-b-modal.game-modal>
            Add Game</button>
            <table class="table table-hover">
                <!-- Table head -->
                <thead>
                    <tr>
                        <!-- Table's header cells -->
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Played?</th>
                        <th scope="col">Platinum?</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody v-for="game, index in games" :key="index"> <!-- v-for list representation -->
                    <tr>
                        <td>{{ game.title }}</td>
                        <td>{{ game.genre }}</td>
                        <td>
                            <span v-if="game.played">Yes</span>
                            <span v-else>No</span>
                        </td>
                        <td>
                            <span v-if="game.platinum">Yes</span>
                            <span v-else>No</span>
                        </td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-info 
                                btn-sm" v-b-modal.game-update-modal
                                @click="editGame(game)">Update</button>

                                <button type="button" class="btn btn-danger 
                                btn-sm" @click="deleteGame(game)"
                                >Delete</button>
                            </div>
                        </td>
                     </tr>
                </tbody>
            </table>
                <footer class="text-black text-center"
                style="border-radius: 5px;">Copyright &copy;. All Rights Reserved
                2021.</footer>
        </div>
    </div>

    <!-- First Modal -->
    <b-modal ref="addGameModal"
             id="game-modal"
             title="Add a new game" hide-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
            <b-form-group id="form-title-group"
                        label="Title:"
                        label-for="form-title-input">
                <b-form-input id="form-title-input"
                            type="text"
                            v-model="addGameForm.title"
                            required
                            placeholder = "Enter game">

                </b-form-input>

            </b-form-group>

            <b-form-group id="form-genre-group"
                        label="Genre:"
                        label-for="form-genre-input">
                <b-form-input id="form-genre-input"
                            type="text"
                            v-model="addGameForm.genre"
                            required
                            placeholder = "Enter genre">

                </b-form-input>

            </b-form-group>

            <!-- Checkbox (Played? and Platinum) -->
            <b-form-group id="form-played-group">
                <b-form-checkbox-group v-model="addGameForm.played" id="form-checks">
                    <b-form-checkbox value="true"> Played? </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <b-form-group id="form-platinum-group">
                <b-form-checkbox-group v-model="addGameForm.platinum" id="form-checks">
                    <b-form-checkbox value="true"> Platinum? </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <!-- Control buttons -->
            <b-button type="submit" variant="outline-info">Submit</b-button>
            <b-button type="reset" variant="outline-danger">Reset</b-button>
        </b-form>
    </b-modal>
    <!-- End of Modal 1 -->

    <!-- Second Modal -->
    <b-modal ref="editGameModal"
             id="game-update-modal"
             title="Update" hide-backdrop hide-footer>
        <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">

            <b-form-group id="form-title-edit-group"
                        label="Title:"
                        label-for="form-title-edit-input">
                <b-form-input id="form-title-edit-input"
                            type="text"
                            v-model="editForm.title"
                            required
                            placeholder = "Enter title">
                </b-form-input>
            </b-form-group>

            <b-form-group id="form-genre-edit-group"
                        label="Genre:"
                        label-for="form-genre-edit-input">
                <b-form-input id="form-genre-edit-input"
                            type="text"
                            v-model="editForm.genre"
                            required
                            placeholder = "Enter genre">

                </b-form-input>

            </b-form-group>

            <!-- Checkbox (Played? and Platinum) -->
            <b-form-group id="form-played-edit-group">
                <b-form-checkbox-group v-model="editForm.played" id="form-checks">
                    <b-form-checkbox value="true"> Played? </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <b-form-group id="form-platinum-edit-group">
                <b-form-checkbox-group v-model="editForm.platinum" id="form-checks">
                    <b-form-checkbox value="true"> Platinum? </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <!-- Control buttons -->
            <b-button type="submit" variant="outline-info">Update</b-button>
            <b-button type="reset" variant="outline-danger">Cancel</b-button>
        </b-form>
    </b-modal>
    <!-- End of Modal 2 -->

</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            games:[],
            addGameForm : {
                title : "",
                genre: "",
                played : [],
                platinum : [],
            },
            editForm : {
                title : "",
                genre: "",
                played : [],
                platinum : [],
            }
        };
    },
    message: "",
    methods:{
        // The GET function
        getGames() {
            const path = 'http://localhost:5000/games';
            axios.get(path)
            .then((res) => {
                this.games = res.data.games;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        // POST function
        addGame(payLoad) {
            const path = 'http://127.0.0.1:5000/games';
            axios.post(path, payLoad)
            .then(() => {
                this.getGames();
                // alert user
                this.message = " Game added !";
                // show message
                this.showMessage = true;
            })
            .catch((err) => {
                console.error(err);
                this.getGames();
            })
        },

        initForm() {
            this.addGameForm.title = "",
            this.addGameForm.genre = "",
            this.addGameForm.played = [],
            this.addGameForm.id = "",
            this.addGameForm.platinum = [],
            this.editForm.title = "",
            this.editForm.genre = "",
            this.editForm.played = [],
            this.editForm.id = "",
            this.editForm.platinum = [];
        },

        // Modal 1's submit new game
        onSubmit(e) {
            e.preventDefault();
            this.$refs.addGameModal.hide();
            let played = false;
            let platinum = false;
            if (this.addGameForm.played[0]) played = true;
            if (this.addGameForm.platinum[0]) platinum = true;
            const payLoad = {
                title : this.addGameForm.title,
                genre : this.addGameForm.genre,
                played,
                platinum
            };
            this.addGame(payLoad);
            this.initForm();
        },

        onReset(e) {
            e.preventDefault();
            this.$refs.addGameModal.hide();
            this.initForm();
        },

        // Modal 2's update game
        onSubmitUpdate(e) {
            e.preventDefault();
            this.$refs.editGameModal.hide();
            let played = false;
            let platinum = false;
            if (this.editGameForm.played[0]) played = true;
            if (this.editGameForm.platinum[0]) platinum = true;
            const payLoad = {
                title : this.editGameForm.title,
                genre : this.editGameForm.genre,
                played,
                platinum
            };
            this.updateGame(payLoad, this.editForm.id);
        },

        //Handle cancel button event
        onResetUpdate(e) {
            e.preventDefault();
            this.$refs.editGameModal.hide();
            this.initForm();
            this.getGames();
        },

        //Updating a game row
        updateGame(payLoad, gameID) {
            const path = `http://localhost:5000/games/${gameID}`;
            axios.get(path, payLoad)
            .then(()=> {
                this.getGames();
                this.message = "Game updated!"
                this.showMessage = true;
            })
            .catch((err) => {
                console.error(err);
                this.getGames();
            })
        },
        // Delete a game
        removeGame(gameID) {
            const path = `http://127.0.0.1:5000/games/${gameID}`
            axios.delete(path)
            .then(() => {
                this.getGames();
                this.message = "Game removed !"
                this.showMessage = true;
            })
            .catch ((err) => {
                console.log(err);
                this.getGames();
            })
        },

        //Handle delete button
        deleteGame(game) {
            this.removeGame(game.id);
        },

        //Handle update button
        editGame(game) {
            this.editForm = game;
        },

    },
    created() {
        this.getGames();
    }
}
</script>
