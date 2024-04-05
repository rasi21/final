

export function updateTotalEntries(totalCount) {
   
    const totalEntriesElement = document.getElementById('total-entries');
    if (totalEntriesElement) {
        totalEntriesElement.textContent = `Showing ${totalCount} entries`;
    }
}
