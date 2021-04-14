export async function getSolvedJson() {

    const response = await fetch('/timeTable');
    return await response.json();
}