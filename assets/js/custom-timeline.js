// assets/js/custom-timeline.js
document.addEventListener('DOMContentLoaded', function() {
    const timelineContainers = document.querySelectorAll('.dynamic-authors-timeline');

    timelineContainers.forEach(container => {
        const commitNodes = container.querySelectorAll('.commit-node');
        const tooltip = document.getElementById('timeline-post-tooltip'); // Un solo tooltip per pagina

        if (!tooltip || commitNodes.length === 0) {
            return;
        }

        const tooltipTitle = tooltip.querySelector('#tooltip-title');
        const tooltipExcerpt = tooltip.querySelector('#tooltip-excerpt');
        const tooltipAuthorDate = tooltip.querySelector('#tooltip-author-date');
        const tooltipLink = tooltip.querySelector('#tooltip-link');

        commitNodes.forEach(node => {
            node.addEventListener('mouseover', function(event) {
                tooltipTitle.textContent = this.dataset.title || 'N/A';
                tooltipExcerpt.textContent = this.dataset.excerpt || '';
                tooltipAuthorDate.textContent = `Autore: ${this.dataset.author || 'N/A'} - Data: ${this.dataset.date || 'N/A'}`;

                if (this.dataset.url && this.dataset.url !== '#') {
                    tooltipLink.href = this.dataset.url;
                    tooltipLink.style.display = 'inline';
                } else {
                    tooltipLink.style.display = 'none';
                }

                // Posizionamento robusto del tooltip
                const nodeRect = this.getBoundingClientRect();
                const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;

                let top = nodeRect.bottom + scrollY + 10; // Sotto il pallino
                let left = nodeRect.left + scrollX + (nodeRect.width / 2) - (tooltip.offsetWidth / 2); // Centrato sotto

                tooltip.style.top = `${top}px`;
                tooltip.style.left = `${left}px`;
                tooltip.style.display = 'block'; // Mostra prima di calcolare le dimensioni reali

                // Aggiustamenti per non uscire dallo schermo
                const tooltipRect = tooltip.getBoundingClientRect();
                if (tooltipRect.right > window.innerWidth - 10) { // 10px di margine
                    left = window.innerWidth - tooltipRect.width - 10 - scrollX;
                }
                if (tooltipRect.left < 10) { // 10px di margine
                    left = 10 - scrollX;
                }
                if (tooltipRect.bottom > window.innerHeight - 10 && (nodeRect.top - tooltipRect.height - 10) > 0) {
                    // Se esce in basso E c'è spazio sopra, mettilo sopra
                    top = nodeRect.top + scrollY - tooltipRect.height - 10;
                } else if (tooltipRect.bottom > window.innerHeight -10) {
                    // Altrimenti se esce comunque in basso, allinealo al fondo finestra
                     top = window.innerHeight - tooltipRect.height - 10 - scrollY;
                }


                tooltip.style.top = `${top}px`;
                tooltip.style.left = `${Math.max(0, left)}px`; // Assicura che left non sia negativo
            });

            node.addEventListener('mouseout', function() {
                tooltip.style.display = 'none';
            });

            node.addEventListener('click', function() {
                const url = this.dataset.url;
                if (url && url !== '#') {
                    window.location.href = url;
                }
            });
        });
    });
});