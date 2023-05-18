<template>
    <section id="tutorial" class="tutorial-container">
        <div class="glow"></div>
        <div class="tutorial-header">
            <div class="flex items-center gap-1">
                <Logo :size="64"/>
                <span class="text-2xl text-medium">{{ SITE_NAME }}</span>
            </div>

            <h1 class="text-medium text-3xl">Guide d'Utilisation</h1>
            <p class="text-contrast-70" style="text-align: left">
                Découvrez notre nouvelle application web dédiée à la gestion et à la facilitation de vos recherches
                d'appartement,
                que vous cherchiez seul ou en groupe. <br><br>
                Vous avez la possibilité d'inviter des amis, que ce soit pour une recherche en couple,
                en colocation ou autre, afin de collaborer efficacement dans votre quête du logement idéal. <br><br>
                Centralisez, organisez et partagez vos annonces immobilières, tout en personnalisant les détails clés de
                votre recherche. <br><br>
                Avec notre carte interactive, visualisez facilement l'emplacement des propriétés,
                planifiez des itinéraires et estimez les temps de trajet. <br><br>
                Profitez également d'un système de notation avancé et d'une gestion de statuts pour chaque propriété.
                <br><br>

                Simplifiez vos recherches et trouvez votre nouveau chez-vous en toute simplicité !
            </p>
            <Button style="min-width: 200px" @click="scrollToSteps">Commencer</Button>
        </div>
        <div class="tutorial-steps" ref="stepsContainer">
            <div class="steps-line"></div>
            <div class="steps-line-active" :style="{ height: `${scrollPosition}px` }"></div>
            <div class="step" v-for="(step, index) in steps" :key="index">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">
                    <h2>{{ step.title }}</h2>
                    <p>{{ step.description }}</p>
                    <div class="step-gif-card">
                        <img src="https://s11.gifyu.com/images/GIF-Recording-2023-05-18-at-10.28.13-PM.gif" alt="Aparteasy authentification presentation gif">
                    </div>
                </div>
            </div>
        </div>

        <footer>
            Profitez de notre application pour centraliser toutes vos annonces immobilières favorites, les partager avec vos amis ou colocataires, et faciliter votre recherche du logement idéal.
        </footer>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Button from '@/components/buttons/Button.vue'
import Logo from '@/components/ui/Logo.vue'
import { SITE_NAME } from '@/env'

const steps = ref([
    {
        title: 'Connexion',
        description: 'Connectez-vous à notre application pour commencer à explorer.',
    },
    {
        title: 'Création ou Sélection d\'une Recherche',
        description: 'Sélectionnez une recherche existante ou créez-en une nouvelle en y attribuant un nom et une localisation de départ.',
    },
    {
        title: 'Invitation d\'Utilisateurs',
        description: 'Vous pouvez inviter d\'autres utilisateurs à se joindre à votre recherche afin de partager et gérer ensemble les annonces trouvées.',
    },
    {
        title: 'Création d\'une Annonce',
        description: 'Ajoutez une nouvelle annonce en entrant les informations pertinentes telles que le prix, les charges, le nombre de pièces, la localisation, l\'URL de l\'annonce, etc.',
    },
    {
        title: 'Notation d\'une Propriété',
        description: 'Attribuez une note sur 5 étoiles à chaque annonce pour évaluer son rapport qualité-prix. Chaque utilisateur peut noter une propriété, et une note moyenne est ensuite calculée et affichée.',
    },
    {
        title: 'Gestion du Statut d\'une Propriété',
        description: 'Vous pouvez modifier le statut d\'une annonce, par exemple pour indiquer si vous avez déjà appelé l\'annonceur ou si la propriété est toujours disponible.',
    },
    {
        title: 'Consultation de la Carte',
        description: 'Consultez la carte pour voir l\'emplacement de la propriété par rapport à votre lieu de recherche. Vous pouvez voir un itinéraire et les temps de trajet estimés en voiture, à pied ou en transport en commun.',
    },
    {
        title: 'Édition d\'une Propriété',
        description: 'Si nécessaire, vous pouvez éditer les informations d\'une annonce, par exemple pour corriger une erreur de prix ou d\'URL.',
    },
    // Ajoutez les autres étapes ici
]);

const scrollPosition = ref(0);

const updateScroll = () => {
    console.log(window.scrollY - 800)
    scrollPosition.value = (window.scrollY - 500);
};

onMounted(() => {
    window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll);
});


let refContainer = ref();
const scrollToSteps = () => {
    const container = refContainer.value;
    if (container) {
        const stepsContainer = container.querySelector('.tutorial-steps');
        if (stepsContainer) {
            window.scrollTo({
                top: stepsContainer.offsetTop,
                behavior: 'smooth',
            });
        }
    }
};

</script>

<style>
.tutorial-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.tutorial-header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    justify-content: center;
    text-align: center;
    margin-bottom: 40px;
    height: 100vh;
}

.tutorial-steps {
    position: relative;
    z-index: 1;
    margin-top: 60px;
}

.steps-line, .steps-line-active {
    position: absolute;
    top: 0;
    left: 15px;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: #333;
    z-index: -1;
}

.steps-line-active {
    background-color: #fff;
}
.step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 25vh;
}

.step-number {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #333;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.step-content {
    margin-left: 20px;
    display: grid;
    gap: 24px;
}
.step-gif-card {
    border-radius: 12px;
    border: 1px solid var(--contrast-30);
}
.step-gif-card img {
    border-radius: 12px;
}
.glow {
    background: linear-gradient(90deg, rgb(255, 58, 66) 0%, rgb(254, 5, 142) 40%);
    filter: blur(180px);
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    mix-blend-mode: soft-light;
    will-change: transform;
    opacity: .7;
    transform: translate(-107px, 25vh);
    position: fixed;
    width: 65vw;
    height: 51vh;
    border-radius: 80% 200% 20% 200%;
}
</style>
