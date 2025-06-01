document.addEventListener('DOMContentLoaded', function() {
    const commitNodes = document.querySelectorAll('.commit-node');
    const tooltip = document.getElementById('post-tooltip');
    const tooltipTitle = document.getElementById('tooltip-title');
    const tooltipExcerpt = document.getElementById('tooltip-excerpt');
    const tooltipLink = document.getElementById('tooltip-link');

    if (!tooltip) {
        console.warn('Tooltip element #post-tooltip not found.');
        return;
    }

    commitNodes.forEach(node => {
        node.addEventListener('mouseover', function(event) {
            const title = this.dataset.title;
            const excerpt = this.dataset.excerpt;
            const url = this.dataset.url;

            tooltipTitle.textContent = title || 'Nessun titolo';
            tooltipExcerpt.textContent = excerpt || 'Nessun excerpt.';
            if (url) {
                tooltipLink.href = url;
                tooltipLink.style.display = 'inline';
            } else {
                tooltipLink.style.display = 'none';
            }
            

            // Posizionamento del tooltip
            // Un po' a destra e sotto il cursore
            let top = event.pageY + 15;
            let left = event.pageX + 15;

            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            tooltip.style.display = 'block';

            // Aggiustamento se il tooltip esce dalla finestra
            const rect = tooltip.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                tooltip.style.left = (window.innerWidth - rect.width - 15) + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                tooltip.style.top = (event.pageY - rect.height - 15) + 'px';
            }
        });

        node.addEventListener('mousemove', function(event) {
            // Aggiorna la posizione mentre il mouse si muove sul nodo
            // per evitare che il tooltip "scatti" se il mouse si muove velocemente
             let top = event.pageY + 15;
             let left = event.pageX + 15;
             tooltip.style.left = left + 'px';
             tooltip.style.top = top + 'px';

             const rect = tooltip.getBoundingClientRect();
             if (rect.right > window.innerWidth) {
                 tooltip.style.left = (window.innerWidth - rect.width - 15) + 'px';
             }
             if (rect.bottom > window.innerHeight) {
                 tooltip.style.top = (event.pageY - rect.height - 15) + 'px';
             }
        });

        node.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
        });

        // Aggiungi un click listener per andare al post
        node.addEventListener('click', function() {
            const url = this.dataset.url;
            if (url) {
                window.location.href = url;
            }
        });
    });
});