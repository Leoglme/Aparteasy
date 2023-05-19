<template>
    <header class="bg-grey-500 bb-1 border-grey-300 gap-2 flex-wrap tutorial-header z-50
    flex px-6 py-2 justify-between items-center" :class="showHeader ? 'opacity-1': 'opacity-0'">
        <Logo :size="30" large/>
        <Button :to="{name: 'signup'}" class="tutorial-cta">Créer mon compte</Button>
    </header>
    <main id="tutorial" class="tutorial-container flex flex-col items-center px-4">
        <div class="glow"></div>
        <section id="home" class="tutorial-landing relative flex w-full
        flex-col items-center justify-center gap-8 vh-100">
            <div class="grid justify-center items-center gap-8 tutorial__cta--container">
                <div class="flex items-center">
                    <Logo :size="64"/>
                    <h1 class="text-2xl text-medium">{{ SITE_NAME }}</h1>
                </div>

                <h1 class="text-medium text-3xl">Guide d'Utilisation</h1>
                <p class="text-contrast-70 text-left">
                    Bienvenue dans notre Guide d'Utilisation étape par étape. Cette page a été conçue pour vous aider à
                    comprendre
                    comment simplifier votre recherche de logement grâce à notre application.
                </p>
                <Button class="tutorial-cta" @click="scrollToSteps">Découvrir</Button>
            </div>
        </section>

        <section id="about" class="tutorial-about mt-10">
            <h2 class="text-2xl text-medium w-full text-left mb-6">En savoir plus</h2>
            <p class="text-contrast-70 text-left">
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
        </section>
        <section id="steps" class="tutorial-steps relative" ref="stepsContainer">
            <div class="steps-line bg-grey-300" :style="{ height: `${stepLineHeightUnitOfMeasure}` }"/>
            <div class="steps-line-active bg-light" :style="{ height: `${stepLinePosition}px` }"></div>
            <div class="step flex"
                 v-for="(step, index) in steps" ref="stepRefs"
                 :key="index">
                <div :class="{ active: index <= activeStep }"
                     class="step-number bg-grey-300 text-light flex items-center
                justify-center text-bold">
                    {{ index + 1 }}
                </div>
                <div class="step-content ml-5 grid gap-6">
                    <h2>{{ step.title }}</h2>
                    <p>{{ step.description }}</p>
                    <div class="step__gif--card rounded-lg border-contrast-30 b-1">
                        <img
                                class="rounded-lg"
                                src="https://s11.gifyu.com/images/GIF-Recording-2023-05-18-at-10.28.13-PM.gif"
                                alt="Aparteasy authentification presentation gif">
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="tutorial-footer bg-grey-500 bt-1 border-grey-300 z-50 grid px-6 pt-3 pb-6 gap-4 items-center">
        <div class="flex items-center gap-2 flex-wrap justify-between">
            <Logo :size="30" large/>
            <Button
                    externalLink
                    target="_blank"
                    href="https://github.com/Leoglme/Aparteasy"
                    class="b-1 border-contrast-30"
                    small
                    square
                    variant="dark"
                    title="Github - source code">
                <Icon :height="24" :width="24" stroke="var(--light)" name="github"/>
            </Button>
        </div>
        <p>Profitez de notre application pour centraliser toutes vos annonces immobilières favorites, les partager avec
            vos
            amis ou colocataires, et faciliter votre recherche du logement idéal.</p>

        <p>© <a class="link" href="https://dibodev.com">Dibodev.com</a> - {{ currentYear }}</p>
    </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Button from '@/components/buttons/Button.vue'
import Logo from '@/components/ui/Logo.vue'
import Icon from '@/components/ui/Icon.vue'
import { SITE_NAME } from '@/env'

/*REFS*/
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
]);
const currentYear = ref(new Date().getFullYear());
const scrollPosition = ref(0);
const viewportWidth = ref(window.innerWidth || document.documentElement.clientWidth);
const viewportHeight = ref(window.innerHeight || document.documentElement.clientHeight);
const stepRefs = ref(null as HTMLElement[] | null);
const stepsContainer = ref(null as HTMLElement | null);
const activeStep = ref(0);
const stepLineHeight = ref(0);

/*COMPUTED*/
const showHeader = computed(() => {
    return scrollPosition.value >= 1000;
});

const stepLinePosition = computed(() => {
    const res = scrollPosition.value - 1000;
    if (res > stepLineHeight.value) {
        return stepLineHeight.value;
    }
    return res
});

const thresold = computed(() => {
    return viewportWidth.value <= 480 ? 0.2 : 0.45;
});

const stepLineHeightUnitOfMeasure = computed(() => {
    return stepLineHeight.value ? `${stepLineHeight.value}px` : '100%';
});


/*METHODS*/
const updateActiveStep = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const i = entry.target.getAttribute('data-index');
                if (i) {
                    activeStep.value = parseInt(i);
                }
            }
        });
    }, {
        threshold: thresold.value,
    });

    stepRefs.value?.forEach((step, index) => {
        step.setAttribute('data-index', index.toString());
        observer.observe(step);
    });
}
const updateScroll = () => {
    scrollPosition.value = window.scrollY;
    updateActiveStep();
    updateStepLineHeight();
};

const updateStepLineHeight = () => {
    const height = stepsContainer.value?.clientHeight
    const marginBottomHeight = viewportHeight.value * 0.25;
    stepLineHeight.value = (height ? (height - marginBottomHeight) : 0);
};

const updateScreenSizes = () => {
    viewportWidth.value = window.innerWidth || document.documentElement.clientWidth;
    viewportHeight.value = window.innerHeight || document.documentElement.clientHeight;
    updateStepLineHeight();
};

const scrollToSteps = () => {
    const topPosition = stepsContainer.value?.getBoundingClientRect().top || 0;
    const offset = 100;
    const finalPosition = topPosition - offset + window.scrollY;

    window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
    });
};


/*LIFECYCLE*/
onMounted(() => {
    updateStepLineHeight();
    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScreenSizes);
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll);
    window.removeEventListener('resize', updateScreenSizes);
});
</script>

<style lang="scss" scoped>
.tutorial-cta {
  max-width: 300px;
}

.tutorial-container {
  max-width: 800px;
  margin: 0 auto;
}

.tutorial-about {
  margin-bottom: 20vh;
}

.tutorial-header {
  position: sticky;
  top: 0;
  transition: opacity .25s ease-in-out;
}

.tutorial-landing {
  top: -60px;
}

.tutorial-landing, .tutorial-about {
  z-index: 1;
}

.tutorial-steps {
  z-index: 1;
  margin-top: 60px;
}

.steps-line, .steps-line-active {
  position: absolute;
  top: 0;
  left: 15px;
  transform: translateX(-50%);
  width: 2px;
  z-index: -1;
}

.step {
  margin-bottom: 25vh;
}

.step-number {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 16px;

  &.active {
    background: var(--light);
    color: var(--grey-700);
  }
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
  z-index: 1;
}
</style>
