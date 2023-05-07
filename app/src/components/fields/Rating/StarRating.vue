<template>
  <div class="rating__star-container"
       :class="{checked, active}">
    <input tabindex="-1" :id="inputId" class="rating__input" :class="`rating__input-${props.index}`" type="checkbox"
           name="rating" :value="props.index" @change="setCurrentStar(props.index)">
    <label class="rating__label" :for="inputId">
      <svg class="rating__star" width="18" height="18" viewBox="0 0 32 32" aria-hidden="true">
        <g transform="translate(16,16)">
          <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)"/>
        </g>
        <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <g transform="translate(16,16) rotate(180)">
            <polygon class="rating__star-stroke"
                     points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                     fill="none"/>
            <polygon class="rating__star-fill"
                     points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                     fill="#000"/>
          </g>
          <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
            <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16"/>
            <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16"/>
            <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16"/>
            <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16"/>
            <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16"/>
          </g>
        </g>
      </svg>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

/*PROPS*/
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  currentStar: {
    type: Number,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  }
});
/*COMPUTED*/
const checked = computed(() => props.index <= props.currentStar);
const active = computed(() => props.index === props.currentStar);

const inputId = computed(() => `rating-${props.uniqueId}-${props.index}`);

/*EMITS*/
const emit = defineEmits(['update:currentStar']);
/*ACTIONS*/
const setCurrentStar = (index: number) => {
  emit('update:currentStar', index);
};
</script>

<style lang="scss">
:root {
  --bezier: cubic-bezier(0.42, 0, 0.58, 1);
  --trans-dur: 0.3s;
}

.rating[data-animate="true"] {
  .rating__star-ring,
  .rating__star-stroke,
  .rating__star-line,
  .rating__star-fill {
    animation-duration: 1s;
  }
}

.rating {
  &__star-container {
    display: flex;

    &:not(.checked):hover .rating__star-stroke {
      stroke: var(--yellow);
      transform: scale(1);
    }
    &.checked {
      &:not(.active):hover .rating__star-fill {
        fill: transparent;
      }

      .rating__star-ring,
      .rating__star-stroke,
      .rating__star-line,
      .rating__star-fill {
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
      }

      .rating__star-ring {
        animation-name: starRing;
      }

      .rating__star-stroke {
        animation-name: starStroke;
      }

      .rating__star-line {
        animation-name: starLine;
      }

      .rating__star-fill {
        animation-name: starFill;
      }
    }
  }

  &__label {
    cursor: pointer;
    padding: 0.125em;
  }

  &__input {
    -webkit-appearance: none;
    appearance: none;
  }

  &__star {
    display: block;
    overflow: visible;
    pointer-events: none;

    &-ring,
    &-fill,
    &-line {
      stroke: var(--yellow);
    }

    &-fill {
      fill: var(--yellow);
      transform: scale(0);
      transition: fill var(--trans-dur) var(--bezier),
      transform var(--trans-dur) var(--bezier);
    }

    &-stroke {
      stroke: var(--contrast-70);
      transition: stroke var(--trans-dur);
    }
  }
}

// Animations
@keyframes starRing {
  from,
  20% {
    animation-timing-function: ease-in;
    opacity: 1;
    stroke-width: 16px;
    transform: scale(0);
  }
  35% {
    animation-timing-function: ease-out;
    opacity: 0.5;
    stroke-width: 16px;
    transform: scale(1);
  }
  50%,
  to {
    opacity: 0;
    stroke-width: 0;
    transform: scale(1);
  }
}

@keyframes starFill {
  from,
  40% {
    animation-timing-function: ease-out;
    transform: scale(0);
  }
  60% {
    animation-timing-function: ease-in-out;
    transform: scale(1.2);
  }
  80% {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

@keyframes starStroke {
  from {
    transform: scale(1);
  }
  20%,
  to {
    transform: scale(0);
  }
}

@keyframes starLine {
  from,
  40% {
    animation-timing-function: ease-out;
    stroke-dasharray: 1 23;
    stroke-dashoffset: 1;
  }
  60%,
  to {
    stroke-dasharray: 12 12;
    stroke-dashoffset: -12;
  }
}
</style>
