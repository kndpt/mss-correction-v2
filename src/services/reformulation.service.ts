'use client';

export class ReformulationTextService {
  private cleaningPatterns: RegExp[] = [
    /^["']|["']$/g, // Guillemets au début et à la fin
    /^Version \d+ :?\s*/i, // "Version X :" au début
    /^\s+|\s+$/g, // Espaces au début et à la fin
    /\n+/g, // Sauts de ligne multiples
  ];

  private cleanResponse(text: string): string {
    return this.cleaningPatterns
      .reduce((cleanedText, pattern) => cleanedText.replace(pattern, ''), text)
      .trim();
  }

  private static getPromptForDegree(degree: number): string {
    const basePrompt =
      'Tu es un expert en réécriture de texte français. Tu dois reformuler le texte donné.';

    switch (degree) {
      case 1:
        return `${basePrompt} Fais une reformulation très subtile en ne changeant pas la structure de la phrase. Conserve au maximum le style original.`;
      case 2:
        return `${basePrompt} Fais une reformulation simple sans dénaturer la patte artistique de l'auteur.`;
      case 3:
        return `${basePrompt} Fais une reformulation en changeant la structure et le vocabulaire tout en préservant le sens.`;
      default:
        return basePrompt;
    }
  }

  async rephraseSentence(
    sentence: string,
    previousVersions: string[] = [],
    reformulationDegree: number = 2
  ): Promise<string> {
    try {
      let prompt = ReformulationTextService.getPromptForDegree(reformulationDegree);

      if (previousVersions.length > 0) {
        prompt += '\nVoici les versions déjà générées :\n';
        previousVersions.forEach((version) => {
          prompt += `${version}\n`;
        });
        prompt +=
          '\nGénère une nouvelle version différente de celles-ci pour la phrase suivante : ';
      }

      const response = await fetch('/api/reformulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${prompt}"${sentence}"`,
          reformulationDegree,
          previousVersions,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la reformulation');
      }

      const data = await response.json();
      return this.cleanResponse(data.result);
    } catch (error) {
      console.error('Error processing sentence:', sentence, error);
      throw error;
    }
  }

  // Web-compatible clipboard methods
  static async copyToClipboard(text: string): Promise<void> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }

      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
      throw error;
    }
  }

  static async readFromClipboard(): Promise<string> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        return await navigator.clipboard.readText();
      }

      // Pour les navigateurs plus anciens, on ne peut pas lire automatiquement
      throw new Error('Lecture du presse-papiers non supportée');
    } catch (error) {
      console.error('Erreur lors de la lecture du presse-papiers:', error);
      throw error;
    }
  }
}
