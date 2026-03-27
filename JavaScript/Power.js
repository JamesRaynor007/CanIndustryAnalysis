document.addEventListener('DOMContentLoaded', function() {
    // Function to style selects
    function styleSelect(select) {
        select.style.padding = '10px 15px';
        select.style.fontSize = '16px';
        select.style.border = 'none';
        select.style.borderRadius = '5px';
        select.style.cursor = 'pointer';
        select.style.background = 'linear-gradient(135deg, #00c9ff, #117c84)';
        select.style.backgroundColor = '#117c84';
        select.style.color = '#92fe9d';
        select.style.outline = 'none';
        select.style.transition = 'all 0.3s ease';
        select.style.pointerEvents = 'auto';
        select.style.position = 'relative';
        select.style.zIndex = '10';

        // Click log for debugging
        select.addEventListener('click', () => console.log(`Clicked ${select.id || 'unknown'} select`));

        // Hover effects
        select.addEventListener('mouseenter', () => {
            select.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        select.addEventListener('mouseleave', () => {
            select.style.boxShadow = 'none';
        });
    }

    // Get sidebar and guard
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        console.error('No existe #sidebar en el DOM. Asegúrate de tener un elemento con id="sidebar"');
        return;
    }

    // Usage instructions section (at top)
    const usageSection = document.createElement('div');
    usageSection.id = 'usageInstructions';
    usageSection.style.marginBottom = '25px';
    usageSection.style.padding = '15px';
    usageSection.style.backgroundColor = 'rgba(255,255,255,0.1)';
    usageSection.style.borderRadius = '10px';
    usageSection.style.fontSize = '14px';
    usageSection.style.color = '#e0f7fa';
    usageSection.style.lineHeight = '1.4';
    usageSection.innerHTML = `
        <div style="font-weight: bold; color: #92fe9d; margin-bottom: 10px; font-size: 16px;">How to use:</div>
        <ul style="margin: 0; padding-left: 20px;">
            <H4><strong>Available Functions:</strong></H4>
            <li>"Total/Medical/Adult-Use" + Evolution + Year</li> <br>
            <li>Total + "Units Sold/Total Sales" + 2026 + Quarter</li><br>
            <li>Total + Evolution + 2026 + Quarter + Month</li><br>
        </ul>
        <div style="font-size: 12px; color: #b0e0e6; margin-top: 0px;">*Click anywhere on popup to close</div>
    `;

    // Filters section
    const filtersSection = document.createElement('div');
    filtersSection.style.marginBottom = '20px';
    filtersSection.innerHTML = '<h5 style="color: white; margin-bottom: 10px; text-align: center;">Filters</h5>';

    const filtersContainer = document.createElement('div');
    filtersContainer.style.display = 'flex';
    filtersContainer.style.flexDirection = 'column';
    filtersContainer.style.gap = '10px';

    // Year dropdown
    const yearSelect = document.createElement('select');
    yearSelect.id = 'year';
    yearSelect.innerHTML = `
        <option value="show-all">Show All</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
    `;
    styleSelect(yearSelect);
    // Initially disabled
    yearSelect.disabled = true;
    yearSelect.style.opacity = '0.5';

    // Quarter dropdown
    const quartersSelect = document.createElement('select');
    quartersSelect.id = 'quarters';
    quartersSelect.innerHTML = `
        <option value="show-all">Show All</option>
        <option value="Q1">Q1</option>
        <option value="Q2">Q2</option>
        <option value="Q3">Q3</option>
        <option value="Q4">Q4</option>
    `;
    styleSelect(quartersSelect);
    // Initially disabled until year
    quartersSelect.disabled = true;
    quartersSelect.style.opacity = '0.5';

    // Months dropdown
    const monthsSelect = document.createElement('select');
    monthsSelect.id = 'months';
    monthsSelect.innerHTML = `<option value="show-all">Show All</option>`;
    styleSelect(monthsSelect);
    // Initially disabled
    monthsSelect.disabled = true;
    monthsSelect.style.opacity = '0.5';

    // Quarter to months mapping
    const quarterMonths = {
        'Q1': ['01-Jan', '02-Feb', '03-Mar'],
        'Q2': ['04-Apr', '05-May', '06-Jun'],
        'Q3': ['07-Jul', '08-Aug', '09-Sep'],
        'Q4': ['10-Oct', '11-Nov', '12-Dec']
    };

    // Helper function for filtered image
    function getFilteredImage(category, metric, year, quarter, month, isQuarterOnly, isYearOnly) {
        console.log('Full filter:', {category, metric, year, quarter, month, isQuarterOnly, isYearOnly});

        // Monthly evolution first priority
        if (category === 'total' && metric === 'evolution' && year === '2026' && quarter !== 'show-all' && month !== 'show-all') {
            const monthNum = month.split('-')[0];
            return `./Power BI Images/Month/${monthNum}-Evolution.jpg`;
        }

        // Quarterly - FIXED: use Q# from quarter value
        if (category === 'total' && metric === 'total-sales' && year === '2026' && quarter !== 'show-all') {
            const qNum = quarter.replace('Q', '');
            return `./Power BI Images/Quarter/Sales/Q${qNum} Evolution-Sales.jpg`;
        }
        if (category === 'total' && metric === 'units-sold' && year === '2026' && quarter !== 'show-all') {
            const qNum = quarter.replace('Q', '');
            return `./Power BI Images/Quarter/Units/Q${qNum} Evolution-Units Sold.jpg`;
        }

        // Yearly evolution - FIXED: match actual image paths from environment
        if (metric === 'evolution' && quarter === 'show-all' && month === 'show-all') {
            if (category === 'medical' && year === '2023') return './Power BI Images/Year/Medical/2023 Medical.jpg';
            if (category === 'medical' && year === '2024') return './Power BI Images/Year/Medical/2024 Medical.jpg';
            if (category === 'medical' && year === '2025') return './Power BI Images/Year/Medical/2025 Medical.jpg';
            if (category === 'adult-use' && year === '2023') return './Power BI Images/Year/Adult-Use/2023 Adult-Use.jpg';
            if (category === 'adult-use' && year === '2024') return './Power BI Images/Year/Adult-Use/2024 Adult-Use.jpg';
            if (category === 'adult-use' && year === '2025') return './Power BI Images/Year/Adult-Use/2025 Adult-Use.jpg';
            if (category === 'total' && year === '2023') return './Power BI Images/Year/Total/2023 Total.jpg';
            if (category === 'total' && year === '2024') return './Power BI Images/Year/Total/2024 Total.jpg';
            if (category === 'total' && year === '2025') return './Power BI Images/Year/Total/2025 Total.jpg';
            if (category === 'total' && year === '2026') return './Power BI Images/Year/Total/2026 Total.jpg';
        }

        // Default stub
        return '';
    }

    // Check all filters for image show
    function showImageIfComplete() {
        const category = categorySelect ? categorySelect.value : 'show-all';
        const metric = metricSelect ? metricSelect.value : 'show-all';
        const year = yearSelect ? yearSelect.value : 'show-all';
        const quarter = quartersSelect ? quartersSelect.value : 'show-all';
        const month = monthsSelect ? monthsSelect.value : 'show-all';

        const imageContainer = document.getElementById('imageContainer');
        if (imageContainer) {
        // Show image if basic filters complete or for Evolution (year-level)
        if (category !== 'show-all' && metric !== 'show-all' && year !== 'show-all') { // Simplified for evolution monthly
            let imgSrc = getFilteredImage(category, metric, year, quarter, month, false, false);
            imageContainer.querySelector('img').src = imgSrc;
            imageContainer.style.display = 'block';
        } else {
            imageContainer.style.display = 'none';
        }
        }
    }

    // Quarter change: populate months
    quartersSelect.addEventListener('change', function() {
        const quarter = this.value;
        console.log('Selected quarter:', quarter);
        // Reset months to consistent default
        monthsSelect.innerHTML = `<option value="show-all">Show All</option>`;
        if (quarter && quarterMonths[quarter]) {
            quarterMonths[quarter].forEach(month => {
                monthsSelect.innerHTML += `<option value="${month}">${month}</option>`;
            });
            monthsSelect.disabled = false;
            monthsSelect.style.opacity = '1';
        } else {
            monthsSelect.disabled = true;
            monthsSelect.style.opacity = '0.5';
        }
        showImageIfComplete();
    });

    // Month change listener
    monthsSelect.addEventListener('change', function() {
        console.log('Month changed:', this.value);
        showImageIfComplete();
    });

    filtersContainer.appendChild(yearSelect);
    filtersContainer.appendChild(quartersSelect);
    filtersContainer.appendChild(monthsSelect);
    filtersSection.appendChild(filtersContainer);

    // Report Kind section (first, no images)
    const reportKindSection = document.createElement('div');
    reportKindSection.style.marginBottom = '20px';
    reportKindSection.innerHTML = '<h5 style="color: white; margin-bottom: 10px; text-align: center;">Report Kind</h5>';

    // Category select (IMPORTANT: se añade más abajo al DOM)
    const categorySelect = document.createElement('select');
    categorySelect.id = 'category';
    categorySelect.innerHTML = `
        <option value="show-all">Show All</option>
        <option value="medical">Medical</option>
        <option value="adult-use">Adult-Use</option>
        <option value="total">Total</option>
    `;
    styleSelect(categorySelect);
    // Force category always clickable
    categorySelect.disabled = false;
    categorySelect.style.opacity = '1';
    categorySelect.style.pointerEvents = 'auto';
    categorySelect.style.position = 'relative';
    categorySelect.style.zIndex = '10';
    categorySelect.addEventListener('click', () => console.log('Clicked category select'));
    console.log('Category select initialized - clickable');

    // Store selected category
    let selectedCategory = '';

    categorySelect.addEventListener('change', function() {
        selectedCategory = this.value;
        console.log('Selected report kind:', selectedCategory);
        // Enable metric if category selected
        if (selectedCategory !== 'show-all') {
            metricSelect.disabled = false;
            metricSelect.style.opacity = '1';
        } else {
            metricSelect.disabled = true;
            metricSelect.style.opacity = '0.5';
            yearSelect.disabled = true;
            yearSelect.style.opacity = '0.5';
            quartersSelect.disabled = true;
            quartersSelect.style.opacity = '0.5';
            monthsSelect.disabled = true;
            monthsSelect.style.opacity = '0.5';
            const imageContainer = document.getElementById('imageContainer');
            if (imageContainer) imageContainer.style.display = 'none';
        }
        showImageIfComplete();
    });

    // Metric dropdown (Units Sold / Total Sales)
    const metricSelect = document.createElement('select');
    metricSelect.id = 'metric';
    metricSelect.innerHTML = `
        <option value="show-all">Show All</option>
        <option value="units-sold">Units Sold</option>
        <option value="total-sales">Total Sales</option>
        <option value="evolution">Evolution</option>
    `;
    styleSelect(metricSelect);
    // Initially disabled
    metricSelect.disabled = true;
    metricSelect.style.opacity = '0.5';

    // Metric change listener: enable year
    metricSelect.addEventListener('change', function() {
        console.log('Metric changed:', this.value);
        if (this.value !== 'show-all') {
            yearSelect.disabled = false;
            yearSelect.style.opacity = '1';
            if (this.value === 'evolution') {
                // For Evolution, enable all filters for monthly detail
                quartersSelect.disabled = false;
                quartersSelect.style.opacity = '1';
            } else {
                quartersSelect.disabled = false;
                quartersSelect.style.opacity = '1';
            }
        } else {
            yearSelect.disabled = true;
            yearSelect.style.opacity = '0.5';
            quartersSelect.disabled = true;
            quartersSelect.style.opacity = '0.5';
            monthsSelect.disabled = true;
            monthsSelect.style.opacity = '0.5';
        }
        showImageIfComplete();
    });

    // Year change: enable/disable quarters
    yearSelect.addEventListener('change', function() {
        console.log('Year changed:', this.value);
        if (this.value !== 'show-all') {
            quartersSelect.disabled = false;
            quartersSelect.style.opacity = '1';
        } else {
            quartersSelect.value = 'show-all';
            quartersSelect.disabled = true;
            quartersSelect.style.opacity = '0.5';
            monthsSelect.innerHTML = `<option value="show-all">Show All</option>`;
            monthsSelect.disabled = true;
            monthsSelect.style.opacity = '0.5';
        }
        showImageIfComplete();
    });

    // Append category and metric to report kind section (category first)
    reportKindSection.appendChild(categorySelect);
    reportKindSection.appendChild(metricSelect);

    // Append to sidebar: Usage first, then Report Kind, then Filters
    sidebar.appendChild(usageSection);
    sidebar.appendChild(reportKindSection);
    sidebar.appendChild(filtersSection);

    // Embedded image container (in main content area)
    const imageContainer = document.createElement('div');
    imageContainer.id = 'imageContainer';
    imageContainer.style.position = 'fixed';
    imageContainer.style.top = '60%';
    imageContainer.style.left = '8%';
    imageContainer.style.transform = 'translateX(-8%) translateY(-60%)';
    imageContainer.style.width = '80vw';
    imageContainer.style.height = '80vh';
    imageContainer.style.backgroundColor = '#117c84';
    imageContainer.style.borderRadius = '20px';
    imageContainer.style.boxShadow = '0 10px 50px rgba(0, 0, 0, 0.5)';
    imageContainer.style.overflow = 'hidden';
    imageContainer.style.display = 'none';
    imageContainer.style.zIndex = '2000';
    imageContainer.style.padding = '20px';
    imageContainer.style.cursor = 'pointer';

    const embeddedImg = document.createElement('img');
    embeddedImg.style.width = '100%';
    embeddedImg.style.height = '100%';
    embeddedImg.style.objectFit = 'contain';

    // Close on any click in container
    imageContainer.addEventListener('click', function() {
        this.style.display = 'none';
    });

    imageContainer.appendChild(embeddedImg);
    document.body.appendChild(imageContainer);
});
