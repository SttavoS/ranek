<template>
    <nav>
        <ul>
            <li :class="{ disabled: source.current_page == 1 }">
                <a href="#" @click.prevent="nextPrev($event, source.current_page - 1)">&laquo;</a>
            </li>
            <li
                v-for="(page, index) in pages"
                :key="index"

            >
                <span v-if="page == '...'">{{ page }}</span>
                <a v-if="page != '...'" href="#" @click.prevent="navigate($event, page)" :class="{ active: source.current_page == page }">
                    {{ page }}
                </a>
            </li>
            <li :class="{ disabled: source.current_page == source.last_page }">
                <a href="#" @click.prevent="nextPrev($event, source.current_page + 1)">
                    &raquo;
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            source: {
                type: Object,
                required: true,
            }
        },
        watch: {
            source() {
                this.pages = this.generatePagesArray(
                    this.source.currentPage,
                    this.source.total,
                    this.source.per_page,
                    12
                );
            }
        },
        computed: {
            pages() {
                return this.generatePagesArray(
                    this.source.currentPage,
                    this.source.total,
                    this.source.per_page,
                    12
                );
            }
        },
        methods: {
            navigate(event, page) {
                this.$emit('navigate', page);
            },
            nextPrev(event, page) {
                if (page == 0 || page == this. source.last_page + 1) {
                    return false;
                }

                this.navigate(event, page);
            },
            generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
                const pages = [];
                const totalPages = Math.ceil(collectionLength / rowsPerPage);
                const halfWay = Math.ceil(paginationRange / 2);
                let position;

                if (currentPage <= halfWay) {
                    position = 'start';
                } else if (totalPages - halfWay < currentPage) {
                    position = 'end';
                } else {
                    position = 'middle';
                }

                const ellipsesNeeded = paginationRange < totalPages;
                let i = 1;
                while (i <= totalPages && i <= paginationRange) {
                    const pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
                    const openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                    const closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                    if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                        pages.push('...');
                    } else {
                        pages.push(pageNumber);
                    }
                    i ++;
                }
                return pages;
            },
            calculatePageNumber(i, currentPage, paginationRange, totalPages) {
                const halfWay = Math.ceil(paginationRange/2);
                if (i === paginationRange) {
                    return totalPages;
                } else if (i === 1) {
                    return i;
                } else if (paginationRange < totalPages) {
                    if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
                } else {
                    return i;
                }
            }
        }
    };
</script>

<style scoped>
    nav {
        display: flex;
        justify-content: center;
    }

    ul {
        grid-column: 1 / -1;
    }

    li {
        display: inline-block;
    }

    li a {
        padding: 2px 8px;
        border-radius: 2px;
        margin: 4px;
    }

    li a.active,
    li a:hover {
        background: #87F;
        color: #FFF;
    }

    .disabled {
        opacity: .6;
        pointer-events: none;
        cursor: not-allowed;
    }
</style>
