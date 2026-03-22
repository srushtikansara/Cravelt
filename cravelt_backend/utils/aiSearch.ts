interface Restaurant {
    name: string;
    cuisine: string[];
    ambience: string[];
    tags: string[];
    features: string[];
    dietary: string[];
    [key: string]: any;
}

export function aiSearch(query: string, restaurants: Restaurant[]) {

    const q = query.toLowerCase();

    return restaurants.filter((r) => {

        const text =
            [
                r.name,
                ...(r.cuisine || []),
                ...(r.ambience || []),
                ...(r.tags || []),
                ...(r.features || []),
                ...(r.dietary || [])
            ].join(" ").toLowerCase();

        return text.includes(q);

    });

}